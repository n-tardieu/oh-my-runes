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

}
