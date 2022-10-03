import { Injectable } from '@angular/core';
import { Rune } from '../core/models/rune.model';
import { SWCalculatorTypes } from '../core/types/sw-calculator.types';
import { SWExporterTypes } from '../core/types/sw-exporter.types';

@Injectable({
  providedIn: 'root'
})
export class RunesConvertService {

  constructor() { }

  convertAllRunes(exportRunes: any) {
    return exportRunes.map((runeToConverte: any) => {
      return this.convertOneRune(runeToConverte)
    }).map((n: any) => new Rune(n))
  }

  convertOneRune(rune: SWExporterTypes.Rune): SWCalculatorTypes.Rune {
    return {
      setType: rune.set_id,
      isAntique: rune.class - 10 > 0,
      stars: rune.class % 10,
      class: rune.class,
      extra: rune.extra,
      rank: rune.rank,
      slotFactor: rune.slot_no,
      primaryEffect: this.convertEffect(rune.pri_eff),
      secondaryEffects: rune.sec_eff.map(this.convertSecondaryEffect),
      innateEffect: this.convertEffect(rune.prefix_eff),
      sellValue: rune.sell_value,
      maxUpgradeLevel: rune.ugrade_limit,
      upgradeLevel: rune.upgrade_curr,
    }
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

}