import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Rune } from '../core/models/rune.model';
import { SWExporterTypes } from '../core/types/sw-exporter.types';
import { RunesConvertService } from './runes-convert.service';

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  missionSubject$ = new Subject<any[]>()

  private missionList: any[] = []

  emitMissionsSubject() {
    console.log("Mission emit");
    this.missionSubject$.next(this.missionList.slice())
  }

  setMissions(missions: any[]) {
    this.missionList = missions
    this.emitMissionsSubject()
  }

  constructor(private runesConvertService: RunesConvertService) { }

  getSpeedMission(runes: Rune[], type: SWExporterTypes.SetType, speedMin: number): number {
    const result = runes.filter((rune: Rune) => {
      return rune.setType == type && ((this.runesConvertService.runeSpeed(rune) >= speedMin))
    }).length
    return result
  }

  getEffMission(runes: Rune[], type: SWExporterTypes.SetType, efficiency: number): number {
    const result = runes.filter((rune: Rune) => {
      if (rune.setType == type && (this.runesConvertService.efficiency(rune) >= efficiency)) return true
      else return false
    }).length
    return result
  }

  getStepMission(number: number, difficulty: 'easy' | 'hard') {
    const stepEasy = [5, 10, 25, 30, 50];
    const stepHard = [3, 5, 10, 15, 20];

    const stepGoal = (difficulty == 'easy' ? stepEasy : stepHard).find(step => {
      if (number < step) {
        return true
      } else
        return false

    });
    if (stepGoal === undefined) return (difficulty == 'easy' ? stepEasy.at(-1) : stepHard.at(-1))
    return stepGoal
  }
}
