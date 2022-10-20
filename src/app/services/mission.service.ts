import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Mission } from '../core/interfaces/mission.interfaces';
import { Rune } from '../core/models/rune.model';
import { SWExporterTypes } from '../core/types/sw-exporter.types';
import { RunesConvertService } from './runes-convert.service';

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  missionSubject$ = new Subject<any[]>()
  private missionList: Mission[] = []

  emitMissionsSubject() {
    // console.log("Mission emit");
    this.missionSubject$.next(this.missionList.slice())
  }

  setMission(mission: Mission) {
    this.missionList.push(mission)
    this.emitMissionsSubject()
  }

  getMissions() {
    return this.missionList
  }

  clearMissions() {
    this.missionList = []
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

  getStepMission(number: number, difficulty: 'easy' | 'hard'): { target: number, missionLevel: number } {
    const stepEasy = [5, 10, 25, 30, 50, 100, 150, 300];
    const stepHard = [3, 5, 10, 15, 20, 50, 75, 100];

    const target = (difficulty == 'easy' ? stepEasy : stepHard).find((step, index) => {
      if (number < step) {
        return true
      } else
        return false
    });

    const missionLevel = (difficulty == 'easy' ? stepEasy : stepHard).findIndex((ele) => {
      if (ele == target) {
        return true
      } else
        return false
    });

    if (target === undefined)
      return {
        target: (difficulty == 'easy' ? stepEasy.at(-1)! : stepHard.at(-1)!),
        missionLevel: (difficulty == 'easy' ? stepEasy.length : stepHard.length)
      }
    return {
      target: target,
      missionLevel: missionLevel + 1
    }
  }

  seedMissions(runes: Rune[]) {
    this.setMission(this.createMission(runes, SWExporterTypes.SetType.VIOLENT, 'spd', 26))
    this.setMission(this.createMission(runes, SWExporterTypes.SetType.VIOLENT, 'eff', 110))
    this.setMission(this.createMission(runes, SWExporterTypes.SetType.WILL, 'spd', 26))
    this.setMission(this.createMission(runes, SWExporterTypes.SetType.WILL, 'eff', 110))
    this.setMission(this.createMission(runes, SWExporterTypes.SetType.SWIFT, 'spd', 26))
    this.setMission(this.createMission(runes, SWExporterTypes.SetType.SWIFT, 'spd', 28))
    this.setMission(this.createMission(runes, SWExporterTypes.SetType.SWIFT, 'eff', 110))
  }

  createMission(runes: Rune[], setType: SWExporterTypes.SetType, missionType: 'eff' | 'spd', criteria: number): Mission {
    const mission: Mission = {
      title: 'Mission Name',
      tag: [],
      missionImg: '',
      target: 1,
      missionLevel: 1,
      avancementCount: 1,
      description: "",
      percentage: 0,
      xp: 1
    }

    let runeTypeName = SWExporterTypes.SetType[setType].toLowerCase()
    mission.missionImg = runeTypeName
    mission.title = missionType == 'spd' ? `${SWExporterTypes.SetType[setType]} spd` : `${SWExporterTypes.SetType[setType]} efficiency`

    if (missionType == 'spd') {
      mission.tag.push('spd')
      mission.avancementCount = this.getSpeedMission(runes, setType, criteria)

      const { target, missionLevel } = this.getStepMission(mission.avancementCount, "easy")
      mission.target = target
      mission.missionLevel = missionLevel
      mission.description = `Cultiver ${mission.target} runes du set ${runeTypeName} avec ${criteria} de vitesse`
    }

    else if (missionType == 'eff') {
      mission.avancementCount = this.getEffMission(runes, setType, criteria)

      const { target, missionLevel } = this.getStepMission(mission.avancementCount, "easy")
      mission.target = target
      mission.missionLevel = missionLevel
      mission.description = `Cultiver ${mission.target} runes du set ${runeTypeName} avec une efficience de  ${criteria}%`
    }

    mission.percentage = mission.avancementCount / mission.target * 100
    mission.xp = mission.missionLevel * 100
    return mission
  }

}
