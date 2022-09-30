import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Rune } from '../core/models/rune.model';

@Injectable({
  providedIn: 'root'
})
export class RuneService {

  rune$ = new Subject<Rune[]>()

  constructor() { }
}
