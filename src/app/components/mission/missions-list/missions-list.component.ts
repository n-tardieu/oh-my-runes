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
  missions: Mission[] = []
  missionsSubscription: Subscription = new Subscription;

  @Input()
  runes: Rune[] = []
  runeSubscription: Subscription = new Subscription;

  runesListParams!: RunesListParams;
  runeListParamsSubscription: Subscription = new Subscription;

  constructor(private runeService: RuneService, private runesConvertService: RunesConvertService, private missionService: MissionService) { }

  ngOnInit(): void {
    this.getRunes()
    this.getRunesListParams()
    this.getMissions()
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("change ", changes);
  }

  ngDoCheck(): void {
    if (this.runes.length !== 0 && this.missions.length === 0) {
      this.setMissions(this.runes)
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

  getMissions() {
    this.missions = this.missionService.getMissions()
    this.missionsSubscription = this.missionService.missionSubject$.subscribe((missions: Mission[]) => {
      this.missions = missions
    })
  }

  setMissions(runes: Rune[]) {
    this.missionService.seedMissions(runes)
  }


}
