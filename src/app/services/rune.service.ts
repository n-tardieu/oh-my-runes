import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Rune } from '../core/models/rune.model';

@Injectable({
  providedIn: 'root'
})
export class RuneService {

  runesSubject$ = new Subject<Rune[]>()

  private runesList: Rune[] = []

  emitRunesSubject() {
    this.runesSubject$.next(this.runesList.slice())
  }

  setRunes(runes: Rune[]) {
    this.runesList = runes
    this.emitRunesSubject()
  }
}
