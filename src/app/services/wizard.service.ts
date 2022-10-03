import { Injectable } from '@angular/core';
import { Rune } from '../core/models/rune.model';
import { SWCalculatorTypes } from '../core/types/sw-calculator.types';
import { SWExporterTypes } from '../core/types/sw-exporter.types';
import { RunesConvertService } from './runes-convert.service';

@Injectable({
  providedIn: 'root'
})
export class WizardService {

  private buildings: any;
  private artifacts: any;
  private units: any;
  private wizard_data: any;
  private storage_runes: any;


  constructor(private runeConvertService: RunesConvertService) {
  }

  // SAVE SW wizard json 
  async saveImport(sw_wizard_json: any) {
    this.wizard_data = sw_wizard_json;
    this.buildings = ""
    this.artifacts = ""
    this.units = ""
    this.wizard_data = sw_wizard_json;
    this.units = await this.convertUnits(sw_wizard_json.unit_list as SWExporterTypes.Unit[])
    this.storage_runes = await this.runeConvertService.convertAllRunes(sw_wizard_json.runes)
  }


  GetBuildings() {
    return this.buildings
  }

  GetStorageRunes() {
    return this.storage_runes
  }

  GetUnits() {
    return this.units
  }

  GetWizardData() {
    return this.wizard_data
  }

  GetArtifacts() {
    return this.artifacts
  }


  private async convertUnits(unit_list: SWExporterTypes.Unit[]) {
    unit_list.forEach(element => {
      element.runes.forEach(rune => {
        let runeToSet = this.runeConvertService.convertOneRune(rune)
        this.storage_runes.push(new Rune(runeToSet))
      })

    });
  }

  convertArtifact(exporterArtifact: SWExporterTypes.Artifact): SWCalculatorTypes.Artifact {
    return {
      extra: exporterArtifact.extra,
      rank: exporterArtifact.rank,
      slot: exporterArtifact.slot,
      type: exporterArtifact.type,
      level: exporterArtifact.level,
      attribute: exporterArtifact.attribute,
      primaryEffect: this.convertEffect(exporterArtifact.pri_effect),
      // map transform original array of type T to another of type U via a function
      secondaryEffects: exporterArtifact.sec_effects.map(this.convertInGameEffect),
    }
  }

  convertEffect(exporterEffect: SWExporterTypes.Effect): SWCalculatorTypes.Effect {
    return {
      type: exporterEffect[0] as SWExporterTypes.EffectType,
      value: exporterEffect[1],
      gems: 0,
      grindstones: 0,
      effect_reducer: 1
    }
  }


  convertInGameEffect(exporterEffect: SWExporterTypes.Effect): SWCalculatorTypes.InGameEffect {
    return {
      type: exporterEffect[0] as SWExporterTypes.InGameEffectType, // tricks to convert type to another. 
      value: exporterEffect[1]
    }
  }

}
