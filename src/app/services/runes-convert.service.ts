import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { RunesListParams } from '../core/interfaces/runes-list-params.interfaces';
import { Effect } from '../core/models/effect.model';
import { Rune } from '../core/models/rune.model';
import { SWCalculatorTypes } from '../core/types/sw-calculator.types';
import { SWExporterTypes } from '../core/types/sw-exporter.types';
import { Wizard } from '../core/types/sw-wizard.types';
import { RuneService } from './rune.service';
import { WizardService } from './wizard.service';

@Injectable({
  providedIn: 'root'
})

export class RunesConvertService {

  // TODO create true id
  id = 1

  runesListParamsSubject$ = new Subject<RunesListParams>()

  private runesListParams: RunesListParams = {
    isOnlyStorageRunes: true,
    isEquipedRunes: true,
    isAbort: true,
    gemGrade: 'default',
    isEfficiencyMax: false
  }

  emitRunesListParamsSubject() {
    console.log("Runes params emit", this.runesListParams);
    this.runesListParamsSubject$.next(this.runesListParams)
  }

  setRunesListParams(runesListParams: RunesListParams) {
    this.runesListParams = runesListParams
    this.emitRunesListParamsSubject()
  }
  getRunesListParams() {
    return this.runesListParams
  }

  convertAllRunes(exportRunes: any) {
    return exportRunes.map((runeToConverte: any) => {
      return this.convertOneRune(runeToConverte)
    }).map((n: any) => new Rune(n))
  }

  convertOneRune(rune: SWExporterTypes.Rune): SWCalculatorTypes.Rune {
    const _rune: Rune = {
      setType: rune.set_id,
      isAntique: rune.class - 10 > 0,
      stars: rune.class % 10,
      class: rune.class,
      extra: rune.extra,
      rank: rune.rank,
      slotFactor: rune.slot_no,
      primaryEffect: this.convertEffect(rune.pri_eff),
      secondaryEffects: rune.sec_eff.map(this.convertSecondaryEffect) as [],
      secondaryEffectsUpgraded: undefined,
      innateEffect: this.convertEffect(rune.prefix_eff),
      sellValue: rune.sell_value,
      maxUpgradeLevel: rune.ugrade_limit,
      upgradeLevel: rune.upgrade_curr,
      efficiency: 0,
      maxEfficiency: 0
    }

    _rune.efficiency = this.efficiency(_rune)

    const { runeMaxGems, gemsCanUse } = this.maxUpgraded(new Rune(_rune))

    _rune.maxEfficiency = _rune.efficiency < this.efficiency(runeMaxGems) ? this.efficiency(runeMaxGems) : _rune.efficiency
    _rune.secondaryEffectsUpgraded = gemsCanUse

    return _rune
  }

  convertEffect(effet: SWExporterTypes.Effect): SWCalculatorTypes.Effect {
    return {
      type: effet[0] as SWCalculatorTypes.EffectType,
      value: effet[1],
      gems: 0,
      grindstones: 0,
      effect_reducer: 1
    }
  }

  convertSecondaryEffect(effect: SWExporterTypes.RuneSecondaryEffect): SWCalculatorTypes.Effect {
    return {
      type: effect[0] as SWExporterTypes.EffectType,
      value: effect[1],
      gems: effect[2],
      grindstones: effect[3],
      effect_reducer: 1
    }
  }

  useRuneForge(wizard: Wizard) {
    // constantes de la methode
    let _runeList: Rune[] = []
    let _runeUnit: Rune[] = []

    let _newRunes: Rune[] = []

    wizard?.runes.map(runeToConverte => {
      return this.convertOneRune(runeToConverte)
    }).map((n: any) => _runeList.push(n))

    wizard?.unit_list.filter(unit => {
      if ((unit.building_id == 0 && this.runesListParams.isOnlyStorageRunes == true)) {
      } else {
        return unit
      }
    })
      .forEach(element => {
        element.runes.forEach((rune: any) => {
          let runeToSet = this.convertOneRune(rune)
          _runeUnit.push(new Rune(runeToSet))
        })
      });

    // TODO need params to switch maxUpgraded or upgradeRunes
    _runeUnit.concat(_runeList).forEach(rune => {
      let runeUpgraded: any = this.upgradeRunes(rune)
      _newRunes.push(runeUpgraded)
    });

    return _newRunes
  }

  cleanFileWithRaid(wizard: Wizard) {

    // constantes de la methode
    let _runeList: Rune[] = []
    let _runeUnit: Rune[] = []

    let _newRunes: Rune[] = []

    let unit_clear = wizard?.unit_list.map(unit => {
      if (unit.building_id == 0 && this.runesListParams.isOnlyStorageRunes == true) {
        return unit
      }
      let template_unit = {
        ...unit
      }
      template_unit.runes = []
      return template_unit
    })

    wizard?.runes.map(runeToConverte => {
      return this.convertOneRune(runeToConverte)
    }).map((n: any) => _runeList.push(n))


    let jsonToSend = {
      ...wizard
    }

    wizard?.unit_list.filter(unit => {
      if ((unit.building_id == 0 && this.runesListParams.isOnlyStorageRunes == true)) {
      } else {
        return unit
      }
    })
      .forEach(element => {
        element.runes.forEach((rune: any) => {
          let runeToSet = this.convertOneRune(rune)
          _runeUnit.push(new Rune(runeToSet))
        })
      });

    _runeUnit.concat(_runeList).forEach(rune => {
      let runeUpgraded: any = this.upgradeRunes(rune)
      let runeFormat: any = this.runeExportFormat(runeUpgraded)
      _newRunes.push(runeFormat)
    });

    // contenue du json
    jsonToSend.runes = _newRunes
    jsonToSend.unit_list = unit_clear
    jsonToSend.rune_craft_item_list = [] // permet de supprimer toutes les meules/gemmes du storage

    // a mettre a jour mieux
    // this.runeService.setRunes(_newRunes)

    return jsonToSend
  }

  upgradeRunes(rune: Rune) {
    if (rune.secondaryEffects) {
      let nbSlots = rune.secondaryEffects
      for (var slot = 0; slot < nbSlots.length; slot++) {
        if (this.runesListParams.gemGrade == "leg") {
          if (rune.secondaryEffects[slot].gems == 1) {
            if (rune.isAntique) {
              rune.secondaryEffects[slot].value = Rune.enchanteGemAntiqueLeg.get(rune.secondaryEffects[slot].type) as number
              rune.secondaryEffects[slot].grindstones = Rune.grindstonesLeg.get(rune.secondaryEffects[slot].type) as number
            } else {
              rune.secondaryEffects[slot].value = Rune.enchanteGemLeg.get(rune.secondaryEffects[slot].type) as number
              rune.secondaryEffects[slot].grindstones = Rune.grindstonesLeg.get(rune.secondaryEffects[slot].type) as number
            }
          } else {
            rune.secondaryEffects[slot].grindstones = Rune.grindstonesLeg.get(rune.secondaryEffects[slot].type) as number
          }
        }

        // not leg
        else if (this.runesListParams.gemGrade == 'hero') {
          if (rune.secondaryEffects[slot].gems == 1) {
            if (rune.isAntique) {
              rune.secondaryEffects[slot].value = (rune.secondaryEffects[slot].value > (Rune.enchanteGemAntiqueHero.get(rune.secondaryEffects[slot].type) as number) && this.runesListParams.isAbort) ? rune.secondaryEffects[slot].value : Rune.enchanteGemAntiqueHero.get(rune.secondaryEffects[slot].type) as number
              rune.secondaryEffects[slot].grindstones = (rune.secondaryEffects[slot].grindstones > (Rune.grindstonesHero.get(rune.secondaryEffects[slot].type) as number) && this.runesListParams.isAbort) ? rune.secondaryEffects[slot].grindstones : Rune.grindstonesHero.get(rune.secondaryEffects[slot].type) as number
            } else {
              rune.secondaryEffects[slot].value = (rune.secondaryEffects[slot].value > (Rune.enchanteGemHero.get(rune.secondaryEffects[slot].type) as number) && this.runesListParams.isAbort) ? rune.secondaryEffects[slot].value : Rune.enchanteGemHero.get(rune.secondaryEffects[slot].type) as number
              rune.secondaryEffects[slot].grindstones = (rune.secondaryEffects[slot].grindstones > (Rune.grindstonesHero.get(rune.secondaryEffects[slot].type) as number) && this.runesListParams.isAbort) ? rune.secondaryEffects[slot].grindstones : Rune.grindstonesHero.get(rune.secondaryEffects[slot].type) as number
            }
          } else {
            rune.secondaryEffects[slot].grindstones = (rune.secondaryEffects[slot].grindstones > (Rune.grindstonesHero.get(rune.secondaryEffects[slot].type) as number) && this.runesListParams.isAbort) ? rune.secondaryEffects[slot].grindstones : Rune.grindstonesHero.get(rune.secondaryEffects[slot].type) as number
          }
        }
      }
    }
    return rune
  }

  runeSpeed(rune: Rune) {
    let spd = 0
    rune.secondaryEffects.forEach((effect: any) => {
      if (effect.type == SWExporterTypes.EffectType.SPEED) {
        spd = effect.value + effect.grindstones
      }
    })
    return spd
  }

  efficiency(rune: Rune): any {
    let ratio = 0;

    // main stat
    ratio += rune.primaryEffect.value / ((Rune.mainStatEfficiency as any).get(rune.primaryEffect.type))

    rune.secondaryEffects.forEach((effect: any) => {
      const value = effect.value + effect.grindstones
      ratio += (value / (Rune.subStatEfficiency as any).get(effect.type)) * (Rune.subStatCustomEfficiency as any).get(effect.type)
    })

    // TODO Fix innateEffect
    if (rune.innateEffect) {
      if (Rune.subStatEfficiency.has(rune.innateEffect.type)) {
        const value = rune.innateEffect.value + rune.innateEffect.grindstones
        ratio += (value / (Rune.subStatEfficiency as any).get(rune.innateEffect.type)) * (Rune.subStatCustomEfficiency as any).get(rune.innateEffect.type)
      }
    }

    let efficiency = (ratio / 2.8) * 100;
    return efficiency
  }

  // update rune with best effType Gems for efficiency
  maxUpgraded(rune: Rune): { runeMaxGems: Rune, gemsCanUse: { index: number, gemsArray: number[] }, } {
    let subSlotToChange = this.subSlotToChange(rune)
    let gemsCantUse = this.slotExeption(rune.slotFactor)

    // innateEffect
    gemsCantUse.push(rune.primaryEffect.type)
    if (rune.innateEffect) {
      gemsCantUse.push(rune.innateEffect.type)
    }

    // we get effType used in other slot and send it in gemsCantUse
    rune.secondaryEffects.forEach((eff, index) => {
      if (index != subSlotToChange) {
        gemsCantUse.push(eff.type)
      }
    })

    // comparer avec grind plus GEMS lorsque possible


    // list of gemsCanUse
    let gemsCanUse = [
      SWExporterTypes.EffectType.HPPercent,
      SWExporterTypes.EffectType.DEFPercent,
      SWExporterTypes.EffectType.ATKPercent,
      SWExporterTypes.EffectType.SPEED,
      SWExporterTypes.EffectType.CRITRate,
      SWExporterTypes.EffectType.ACC,
      SWExporterTypes.EffectType.HP
    ].filter((effType: number) => {
      if (gemsCantUse.includes(effType)) {
        return false
      } return true
    }).filter(e => e != null);


    // now we select in gemsCanUse the best choice
    let bestGemCanBeUse = gemsCanUse[0]

    if (bestGemCanBeUse !== undefined) {
      if (this.runesListParams.gemGrade == "leg") {
        (rune.secondaryEffects[subSlotToChange] as SWCalculatorTypes.Effect || {}).gems = 1;
        (rune.secondaryEffects[subSlotToChange] as SWCalculatorTypes.Effect || {}).type = bestGemCanBeUse;
        (rune.secondaryEffects[subSlotToChange] as SWCalculatorTypes.Effect || {}).value = Rune.enchanteGemLeg.get(bestGemCanBeUse) as number
        (rune.secondaryEffects[subSlotToChange] as SWCalculatorTypes.Effect || {}).grindstones = Rune.grindstonesLeg.get(bestGemCanBeUse) as number
      } else {
        (rune.secondaryEffects[subSlotToChange] as SWCalculatorTypes.Effect || {}).gems = 1;
        (rune.secondaryEffects[subSlotToChange] as SWCalculatorTypes.Effect || {}).type = bestGemCanBeUse;
        (rune.secondaryEffects[subSlotToChange] as SWCalculatorTypes.Effect || {}).value = Rune.enchanteGemHero.get(bestGemCanBeUse) as number
        (rune.secondaryEffects[subSlotToChange] as SWCalculatorTypes.Effect || {}).grindstones = Rune.grindstonesHero.get(bestGemCanBeUse) as number
      }

    }


    return { runeMaxGems: rune, gemsCanUse: { index: subSlotToChange, gemsArray: gemsCanUse } };
  }

  // need to be more explicite use SWExpoterTypes.EffectType
  slotExeption(slotNumer: number): any {
    if (slotNumer == 1) {
      return [5, 6]
    }
    if (slotNumer == 3) {
      return [3, 4]
    }
    return []
  }



  subSlotToChange(rune: Rune): number {
    // let less = 200
    let less = Number.MAX_SAFE_INTEGER
    let subTochange = 0
    rune.secondaryEffects.forEach((effect, index) => {
      if (effect.gems == 1) {
        subTochange = index
        less = 0
      } else {
        const value = this.runesListParams.gemGrade == "leg" ? effect.value + (Rune.grindstonesLeg.get(effect.type) as number) : effect.value + (Rune.grindstonesHero.get(effect.type) as number)
        const ratio = (value / (Rune.subStatEfficiency as any).get(effect.type) * (Rune.subStatCustomEfficiency as any).get(effect.type))
        if (ratio < less) {
          less = ratio
          subTochange = index
        }
      }
    })
    return subTochange
  }

  runeExportFormat(rune: Rune) {

    this.id += 1
    let isAntique = 0
    let secEffect: any = []
    if (rune.isAntique) {
      isAntique = 10
    }

    rune.secondaryEffects.forEach((val, index) => {
      secEffect.push([
        rune.secondaryEffects[index].type,
        rune.secondaryEffects[index].value,
        rune.secondaryEffects[index].gems,
        rune.secondaryEffects[index].grindstones
      ])
    });

    return {
      "rune_id": this.id,
      "wizard_id": 89969661,
      "occupied_type": 1,
      "occupied_id": 0,
      "slot_no": rune.slotFactor,
      "rank": 5 + isAntique,
      "class": 6 + isAntique,
      "set_id": rune.setType,
      "upgrade_limit": 15,
      "upgrade_curr": rune.upgradeLevel,
      "base_value": rune.sellValue,
      "sell_value": rune.sellValue,
      "pri_eff": [
        rune.primaryEffect.type,
        rune.primaryEffect.value,
      ],
      "prefix_eff": [
        rune.innateEffect.type,
        rune.innateEffect.value,
      ],
      "sec_eff": secEffect,
      "extra": rune.extra
    }
  }
}