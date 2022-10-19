import { Component, Input, OnInit } from '@angular/core';
import { Mission } from 'src/app/core/interfaces/mission.interfaces';

@Component({
  selector: 'app-mission-card',
  templateUrl: './mission-card.component.html',
  styleUrls: ['./mission-card.component.scss']
})
export class MissionCardComponent implements OnInit {

  @Input()
  mission!: Mission

  constructor() { }

  ngOnInit(): void {
  }

  getTitle(m: Mission) {
    return `${m.title} - Level ${this.getNumberRomanize(m.missionLevel)} (${m.avancementCount}/${m.target})`
  }

  // TODO
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
}
