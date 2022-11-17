import { Component, Input, OnInit } from '@angular/core';
import { Effect } from 'src/app/core/models/effect.model';
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

  getNaturalRank(rank: number) {
    return SWExporterTypes.Rank[rank]
  }

  formatEffect(effect: Effect) {
    if (
      effect.type == SWExporterTypes.EffectType.ATK ||
      effect.type == SWExporterTypes.EffectType.HP ||
      effect.type == SWExporterTypes.EffectType.DEF ||
      effect.type == SWExporterTypes.EffectType.SPEED
    ) {
      return `+${effect.value + effect.grindstones}`
    } else {
      return `+${effect.value + effect.grindstones}%`
    }
  }

  formatType(type: SWExporterTypes.EffectType) {
    return Effect.typeStr[type]
  }

  getBackgroundSlot(){
    return `url(../../../../assets/png/runes/rune_${this.rune.slotFactor}.png)`
  }

  getBackgroundRank(){
    return `url(../../../../assets/png/runes/bg_heroic.png)`
  }
}
