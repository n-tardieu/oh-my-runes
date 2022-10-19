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
      title: 'Combatant IV (3/12)',
      tag: ['db', 'spd'],
      missionImg: '',
      target: 12,
      avancementCount: 3,
      description: "Avoir récolter 12 runes d'une qualité platine",
      percentage: 25,
      xp: 100
    },
    {
      title: 'Combatant V (25/30)',
      tag: ['db', 'spd'],
      missionImg: '',
      target: 30,
      avancementCount: 25,
      description: "Avoir récolter 30 runes d'une qualité platine",
      percentage: 83.3,
      xp: 200
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
    if (!!this.runes) {
      this.getMission()
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

  getMission() {
    let vio = this.missionService.getEffMission(this.runes, SWExporterTypes.SetType.VIOLENT, 115)
    console.log(`Vio 120%  ${vio} / ${this.missionService.getStepMission(vio, "easy")}`)
    console.log("Will 108% : ", this.missionService.getEffMission(this.runes, SWExporterTypes.SetType.WILL, 108))
    console.log("Swift 26spd : ", this.missionService.getSpeedMission(this.runes, SWExporterTypes.SetType.SWIFT, 26))
  }


}
