import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Wizard } from '../core/types/sw-wizard.types';

@Injectable({
  providedIn: 'root'
})
export class WizardService {

  wizardSubject$ = new Subject<Wizard>()

  private wizard_data: any

  constructor() {
  }

  emitWizardSubject() {
    console.log('Wizard has emit !');
    this.wizardSubject$.next(this.wizard_data)
    // TODO check why slice don't work
    // this.wizardSubject$.next(this.wizard_data.slice()) 
  }

  setWizard(wizardJson: any) {
    this.wizard_data = wizardJson
    this.emitWizardSubject()
  }


  getWizardData() {
    return this.wizard_data
  }

  clearWizardData() {
    this.wizard_data = undefined
    this.emitWizardSubject()
  }

  generateWizardJSON() {
    this.downloadObjectAsJson(this.wizard_data, `runes-grinds-exemple`)
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
