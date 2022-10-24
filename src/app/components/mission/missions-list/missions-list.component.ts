import { Component, DoCheck, Input, KeyValueDiffer, KeyValueDiffers, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Mission } from 'src/app/core/interfaces/mission.interfaces';
import { RunesListParams } from 'src/app/core/interfaces/runes-list-params.interfaces';
import { Rune } from 'src/app/core/models/rune.model';
import { SWExporterTypes } from 'src/app/core/types/sw-exporter.types';
import { MissionService } from 'src/app/services/mission.service';
import { RuneService } from 'src/app/services/rune.service';
import { RunesConvertService } from 'src/app/services/runes-convert.service';
import { WizardService } from 'src/app/services/wizard.service';

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


  @Input()
  public sortObject: { params: keyof Mission, order: 'asc' | 'desc' } = {
    params: 'percentage',
    order: 'desc'
  }

  runesListParams!: RunesListParams;
  runeListParamsSubscription: Subscription = new Subscription;

  private paramsDiffer!: KeyValueDiffer<string, any>;
  private sortObjectDiffer!: KeyValueDiffer<string, any>;


  constructor(
    private differs: KeyValueDiffers,
    private runeService: RuneService,
    private runesConvertService: RunesConvertService,
    private missionService: MissionService,
    private wizardService: WizardService
  ) { }

  ngOnInit(): void {
    this.getRunes()
    this.getRunesListParams()
    this.getMissions()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.missionService.clearMissions();
  }

  ngDoCheck(): void {
    const changes = this.paramsDiffer.diff(this.runesListParams)
    if (changes) {
      this.missionService.clearMissions()
      const runesUpdated = this.optimizeRunes(this.wizardService.getWizardData())
      this.runeService.setRunes(runesUpdated)
    }

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
    this.paramsDiffer = this.differs.find(this.runesListParams).create();

    this.runeListParamsSubscription = this.runesConvertService.runesListParamsSubject$.subscribe((runesListParams: RunesListParams) => {
      this.runesListParams = runesListParams
    })
  }

  getMissions() {
    this.missions = this.missionService.getMissions()
    this.missionsSubscription = this.missionService.missionSubject$.subscribe((missions: Mission[]) => {
      this.missions = this.sortMissions(missions, this.sortObject.params, this.sortObject.order)
    })
  }

  setMissions(runes: Rune[]) {
    this.missionService.seedMissions(runes)
  }

  optimizeRunes(wizard: any): Rune[] {
    return this.runesConvertService.useRuneForge(wizard)
  }

  sortMissions(missions: Mission[], params: keyof Mission, order: 'asc' | 'desc'): Mission[] {
    let missionSort = missions.sort((mission_a: Mission, mission_b: Mission) => {
      let comparison = 0;
      if ((mission_a[params] as number) > (mission_b[params] as number)) {
        comparison = 1;
      } else if ((mission_a[params] as number) < (mission_b[params] as number)) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    })
    return missionSort
  }


}
