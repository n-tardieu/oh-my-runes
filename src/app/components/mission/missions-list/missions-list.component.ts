import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Rune } from 'src/app/core/models/rune.model';
import { SWExporterTypes } from 'src/app/core/types/sw-exporter.types';
import { MissionService } from 'src/app/services/mission.service';
import { RuneService } from 'src/app/services/rune.service';

@Component({
  selector: 'app-missions-list',
  templateUrl: './missions-list.component.html',
  styleUrls: ['./missions-list.component.scss']
})
export class MissionsListComponent implements OnInit, OnChanges {

  @Input()
  runes: Rune[] = []
  runeSubscription: Subscription = new Subscription;

  constructor(private runeService: RuneService, private missionService: MissionService) { }


  ngOnInit(): void {
    this.runeSubscription = this.runeService.runesSubject$.subscribe((runes: Rune[]) => {
      this.runes = runes
      console.log("runeSubscription");
    })

  }

  ngOnChanges(): void {
  }



}
