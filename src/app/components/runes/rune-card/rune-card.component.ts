import { Component, Input, OnInit } from '@angular/core';
import { Rune } from 'src/app/core/models/rune.model';
import { SWExporterTypes } from 'src/app/core/types/sw-exporter.types';

@Component({
  selector: 'app-rune-card',
  templateUrl: './rune-card.component.html',
  styleUrls: ['./rune-card.component.scss']
})
export class RuneCardComponent implements OnInit {

  @Input()
  rune!: Rune

  constructor() { }

  ngOnInit(): void {
  }

  getType() {
    return SWExporterTypes.SetType[this.rune.setType].toLowerCase()
  }

  getEffect(type: number) {
    return SWExporterTypes.EffectType[type]
  }

  getNaturalRank(rank: number){
    return SWExporterTypes.Rank[rank]
  }

}
