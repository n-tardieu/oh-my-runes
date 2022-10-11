import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {

  @Input()
  type!: string;

  constructor() { }

  ngOnInit(): void {
  }


  getTitle() {
    if (this.type == 'gb') {
      return 'GB'
    } else if (this.type == 'db') {
      return 'DB'
    } else if (this.type == 'nb') {
      return 'NB'
    } else if (this.type == 'spd') {
      return 'speed'
    }
    return 'undefined'
  }

}
