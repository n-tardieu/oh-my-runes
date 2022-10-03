import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { RunesConvertService } from './runes-convert.service';

@Injectable({
  providedIn: 'root'
})
export class WizardService {

  wizardSubject$ = new Subject<any>()

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

}
