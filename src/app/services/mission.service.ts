import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Rune } from '../core/models/rune.model';
import { SWExporterTypes } from '../core/types/sw-exporter.types';
import { RuneService } from './rune.service';

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

  constructor() { }

  getSpeedMission(runes: Rune[], type: SWExporterTypes.SetType, speedMin: number): number {
    console.log(runes);
    
    const result = runes.filter((rune: Rune) => {
      return rune.setType == type
    })
    console.log("res ", result);
    
    return result.length
  }

  getEffMission(runes: Rune[], type: SWExporterTypes.SetType, efficiency: number): number {
    const result = runes.filter((rune: Rune) => {
      return rune.setType == type
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
