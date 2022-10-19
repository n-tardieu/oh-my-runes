import { Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Mission } from 'src/app/core/interfaces/mission.interfaces';
import { RunesListParams } from 'src/app/core/interfaces/runes-list-params.interfaces';
import { Rune } from 'src/app/core/models/rune.model';
import { SWExporterTypes } from 'src/app/core/types/sw-exporter.types';
import { MissionService } from 'src/app/services/mission.service';
import { RuneService } from 'src/app/services/rune.service';
import { RunesConvertService } from 'src/app/services/runes-convert.service';

@Component({
  selector: 'app-missions-list',
  templateUrl: './missions-list.component.html',
  styleUrls: ['./missions-list.component.scss']
})
export class MissionsListComponent implements OnInit, OnChanges, DoCheck {

  @Input()
  missionsList: Mission[] = [
    {
      title: 'Mission TEST',
      tag: ['spd', 'db'],
      missionImg: 'energy',
      target: 1,
      missionLevel: 1,
      avancementCount: 0,
      description: "undefined",
      percentage: 0,
      xp: 1
    }
  ]

  @Input()
  runes: Rune[] = []
  runeSubscription: Subscription = new Subscription;

  runesListParams!: RunesListParams;
  runeListParamsSubscription: Subscription = new Subscription;

  constructor(private runeService: RuneService, private runesConvertService: RunesConvertService, private missionService: MissionService) { }

  ngOnInit(): void {
    this.getRunes()
    this.getRunesListParams()

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("change ", changes);
  }

  ngDoCheck(): void {
    if (!!this.runes && this.missionsList.length == 1) {
      this.setMissions()
    }
  }

  getRunes() {
    this.runes = this.runeService.getRunes()
    this.runeSubscription = this.runeService.runesSubject$.subscribe((runes: Rune[]) => {
      this.runes = runes
    })
  }

  getRunesListParams() {
    this.runesListParams = this.runesConvertService.getRunesListParams()
    this.runeListParamsSubscription = this.runesConvertService.runesListParamsSubject$.subscribe((runesListParams: RunesListParams) => {
      this.runesListParams = runesListParams
    })
  }

  setMissions() {
    this.createMission(this.runes, SWExporterTypes.SetType.VIOLENT, 'spd', 26)
    this.createMission(this.runes, SWExporterTypes.SetType.VIOLENT, 'eff', 110)
    this.createMission(this.runes, SWExporterTypes.SetType.WILL, 'spd', 26)
    this.createMission(this.runes, SWExporterTypes.SetType.WILL, 'eff', 110)
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
    mission.title = missionType == 'spd' ? `${SWExporterTypes.SetType[setType]} spd` :  `${SWExporterTypes.SetType[setType]} efficiency`

    if (missionType == 'spd') {
      mission.tag.push('spd')
      mission.avancementCount = this.missionService.getSpeedMission(runes, setType, criteria)

      const { target, missionLevel } = this.missionService.getStepMission(mission.avancementCount, "easy")
      mission.target = target
      mission.missionLevel = missionLevel
      mission.description = `Cultiver ${mission.target} runes du set ${runeTypeName} avec ${criteria} de vitesse`
    }

    else if (missionType == 'eff') {
      mission.avancementCount = this.missionService.getEffMission(runes, setType, criteria)

      const { target, missionLevel } = this.missionService.getStepMission(mission.avancementCount, "easy")
      mission.target = target
      mission.missionLevel = missionLevel
      mission.description = `Cultiver ${mission.target} runes du set ${runeTypeName} avec une efficience de  ${criteria}%`
    }

    mission.percentage = mission.avancementCount / mission.target * 100
    mission.xp = mission.missionLevel * 100

    this.missionsList.push(mission)

    return mission
  }


}
