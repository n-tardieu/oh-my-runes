import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Rune } from '../core/models/rune.model';
import { Wizard } from '../core/types/sw-wizard.types';
import { RunesConvertService } from './runes-convert.service';
import { WizardService } from './wizard.service';

@Injectable({
  providedIn: 'root'
})
export class RuneService {

  runesSubject$ = new Subject<Rune[]>()
  private runesList: Rune[] = []

  emitRunesSubject() {
    console.log("Runes has emit !");
    this.runesSubject$.next(this.runesList.slice())
  }

  setRunes(runes: Rune[]) {
    this.runesList = runes
    this.emitRunesSubject()
  }
  getRunes() {
    return this.runesList
  }

}
