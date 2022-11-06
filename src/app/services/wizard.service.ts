import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Wizard } from '../core/types/sw-wizard.types';
import { RuneService } from './rune.service';

@Injectable({
  providedIn: 'root'
})
export class WizardService {

  wizardSubject$ = new Subject<Wizard>()

  private wizard_data: any

  emitWizardSubject() {
    console.log('Wizard has emit !');
    this.wizardSubject$.next(this.wizard_data)

    // TODO check why slice don't work
    // this.wizardSubject$.next(this.wizard_data.slice()) 
  }

  setWizard(wizardJson: any) {
    this.wizard_data = wizardJson
    this.emitWizardSubject()

    // data to local storage
    localStorage.setItem('wizard', JSON.stringify(this.wizard_data));
  }


  getWizardData() {
    return this.wizard_data
  }

  clearWizardData() {
    this.wizard_data = undefined
    this.emitWizardSubject()
  }

  constructor() {
    if (this.wizard_data == undefined) {
      const localWizard = localStorage.getItem('wizard');
      if (typeof localWizard == 'string') this.setWizard(JSON.parse(localWizard))
    }
  }


  generateWizardJSON(json: any) {
    this.downloadObjectAsJson(json, `ohmyRunes`)
  }

  downloadObjectAsJson(exportObj: any, exportName: string) {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }
}
