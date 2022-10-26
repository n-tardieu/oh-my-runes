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
    const result = this.speedFilter(runes, type, speedMin).length
    return result
  }

  getEffMission(runes: Rune[], type: SWExporterTypes.SetType, efficiency: number): number {
    const result = this.efficiencyFilter(runes, type, efficiency).length
    return result
  }

  getSpeedAndEfficiencyMissions(runes: Rune[], type: SWExporterTypes.SetType, efficiency: number, speedMin: number) {
    const firstFilteredRunes: Rune[] = this.efficiencyFilter(runes, type, efficiency)
    const secondFilteredRunes = this.speedFilter(firstFilteredRunes, type, speedMin)
    return secondFilteredRunes.length
  }

  speedFilter(runes: Rune[], type: SWExporterTypes.SetType, speedMin: number): Rune[] {
    return runes.filter((rune: Rune) => {
      return rune.setType == type && ((this.runesConvertService.runeSpeed(rune) >= speedMin))
    })
  }
  efficiencyFilter(runes: Rune[], type: SWExporterTypes.SetType, efficiency: number): Rune[] {
    return runes.filter((rune: Rune) => {
      if (rune.setType == type && (this.runesConvertService.efficiency(rune) >= efficiency)) return true
      else return false
    })
  }

  getStepMission(number: number, difficulty: 'easy' | 'hard'): { target: number, missionLevel: number } {
    const stepEasy = [5, 10, 25, 40, 50];
    const stepHard = [3, 5, 10, 12, 15];

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

  getStepMissionTest(number: number, tab: any, index: number): { target: number, missionLevel: number, isLastMission: boolean } {
    let missionLevel = index + 1
    let target = tab[index]
    let isLastMission = tab.length == index + 1

    return {
      target: target,
      missionLevel: missionLevel,
      isLastMission: isLastMission
    }
  }

  seedMissions(runes: Rune[]) {
    let canNext = true
    let missionIndex = 0
    let tab = [3, 5, 10, 15, 30]
    while (canNext) {
      const { mission, next } = this.createMissionTest(runes, SWExporterTypes.SetType.VIOLENT, 'spd', tab, missionIndex)

      this.setMission(mission)
      canNext = next
      missionIndex += 1
    }

    /*
    this.setMission(this.createMission(runes, SWExporterTypes.SetType.VIOLENT, 'eff', 104))
    this.setMission(this.createMission(runes, SWExporterTypes.SetType.VIOLENT, 'eff-spd', 100))

    this.setMission(this.createMission(runes, SWExporterTypes.SetType.WILL, 'spd', 26))
    this.setMission(this.createMission(runes, SWExporterTypes.SetType.WILL, 'eff', 104))
    this.setMission(this.createMission(runes, SWExporterTypes.SetType.WILL, 'eff-spd', 100))

    this.setMission(this.createMission(runes, SWExporterTypes.SetType.SWIFT, 'spd', 26))
    this.setMission(this.createMission(runes, SWExporterTypes.SetType.SWIFT, 'eff', 104))
    this.setMission(this.createMission(runes, SWExporterTypes.SetType.SWIFT, 'eff-spd', 100))

    this.setMission(this.createMission(runes, SWExporterTypes.SetType.DESPAIR, 'spd', 26))
    this.setMission(this.createMission(runes, SWExporterTypes.SetType.DESPAIR, 'eff', 104))
    this.setMission(this.createMission(runes, SWExporterTypes.SetType.DESPAIR, 'eff-spd', 100))
    */
  }

  createMissionTest(runes: Rune[], setType: SWExporterTypes.SetType, missionType: 'eff' | 'spd' | 'eff-spd', tab: any, index: number): { mission: Mission, next: boolean } {
    const mission: Mission = {
      title: 'Mission Name',
      tag: [],
      missionImg: '',
      target: 1,
      missionLevel: 1,
      avancementCount: 1,
      description: "",
      percentage: 0,
      xp: 1,
      secretTag: '',
      completed: false
    }

    let next = false;

    let runeTypeName = SWExporterTypes.SetType[setType].toLowerCase()
    mission.missionImg = runeTypeName
    mission.title = missionType == 'spd' ? `${SWExporterTypes.SetType[setType]} speed quest` : `${SWExporterTypes.SetType[setType]} efficiency quest`
    mission.tag.push('speed')
    mission.avancementCount = this.getSpeedMission(runes, setType, 18)

    const { target, missionLevel, isLastMission } = this.getStepMissionTest(mission.avancementCount, tab, index)
    mission.target = target
    mission.missionLevel = missionLevel
    mission.description = `Cultiver ${mission.target} runes du set ${runeTypeName} avec 18 de vitesse`
    next = next

    mission.percentage = mission.avancementCount / mission.target * 100
    if (mission.percentage >= 100) {
      mission.completed = true;
      next = true
    }
    mission.xp = mission.missionLevel * 100
    mission.secretTag = `${this.getNumberRomanize(mission.missionLevel)} ${this.getCairossType(setType)} ${mission.completed ? 'completed' : 'ongoing'}`

    return { mission: mission, next: isLastMission ? false : next }
  }

  createMission(runes: Rune[], setType: SWExporterTypes.SetType, missionType: 'eff' | 'spd' | 'eff-spd', criteria: number, secondCriteria: number = 21): Mission {
    const mission: Mission = {
      title: 'Mission Name',
      tag: [],
      missionImg: '',
      target: 1,
      missionLevel: 1,
      avancementCount: 1,
      description: "",
      percentage: 0,
      xp: 1,
      secretTag: '',
      completed: false
    }

    let runeTypeName = SWExporterTypes.SetType[setType].toLowerCase()
    mission.missionImg = runeTypeName
    mission.title = missionType == 'spd' ? `${SWExporterTypes.SetType[setType]} speed quest` : `${SWExporterTypes.SetType[setType]} efficiency quest`

    if (missionType == 'spd') {
      mission.tag.push('speed')
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

    else if (missionType == 'eff-spd') {
      mission.tag.push('perfect')
      mission.avancementCount = this.getSpeedAndEfficiencyMissions(runes, setType, criteria, secondCriteria)

      const { target, missionLevel } = this.getStepMission(mission.avancementCount, 'hard')
      mission.target = target
      mission.missionLevel = missionLevel
      mission.description = `Cultiver ${mission.target} runes du set ${runeTypeName} avec ${criteria}% d'efficience pour ${secondCriteria} de vitesse`
    }


    // this ligne add caiross tag
    // mission.tag.push(this.getCairossType(setType))
    mission.percentage = mission.avancementCount / mission.target * 100
    if (mission.percentage >= 100) mission.completed = true
    mission.xp = mission.missionLevel * 100
    mission.secretTag = `${this.getNumberRomanize(mission.missionLevel)} ${this.getCairossType(setType)} ${mission.completed ? 'completed' : 'ongoing'}`

    return mission
  }

  getNumberRomanize(number: number) {
    if (number == 1) return 'I'
    else if (number == 2) return 'II'
    else if (number == 3) return 'III'
    else if (number == 4) return 'IV'
    else if (number == 5) return 'V'
    else if (number == 6) return 'VI'
    else if (number == 7) return 'VII'
    else if (number == 8) return 'VIII'
    else return '0'
  }

  getCairossType(setType: SWExporterTypes.SetType): string {
    const set = SWExporterTypes.SetType[setType]
    if (set == 'ENERGY' || set === 'BLADE' || set === 'SWIFT' || set === 'FATAL' || set === 'DESPAIR') return 'gb'
    if (set === 'VIOLENT' || set === 'FOCUS' || set === 'REVENGE' || set === 'GUARD' || set === 'SHIELD' || set === 'ENDURE') return 'db'
    if (set == 'RAGE' || set === 'VAMPIRE' || set === 'NEMESIS' || set === 'WILL' || set === 'DESTROY') return 'nb'
    return 'undefined'
  }

  /*
  isRuneFocusRta(setType: SWExporterTypes.SetType): boolean {
    const set = SWExporterTypes.SetType[setType]
    if (set == 'VIOLENT' || set === 'SWIFT' || set === 'DESPAIR' || set === 'WILL') return true
    return false
  }
  */

}
