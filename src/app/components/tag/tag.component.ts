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
    this.getBackgroundColor()
  }


  getTitle() {
    if (this.type == 'gb') {
      return 'GB'
    } else if (this.type == 'db') {
      return 'DB'
    } else if (this.type == 'nb') {
      return 'NB'
    } else if (this.type == 'speed') {
      return 'speed'
    } else if (this.type) {
      return this.type
    }
    return 'undefined'
  }

  getBackgroundColor() {
    if (this.type == 'gb' || this.type == 'db' || this.type == 'nb') {
      return '#7FFFD4'
    } else if (this.type == 'speed') {
      return '#FFFF19'
    } else if (this.type) {
      return '#6E00E0'
    }
    return '#FFFFFF'
  }

  getColor() {
    if (this.type == 'gb' || this.type == 'db' || this.type == 'nb') {
      return 'black'
    } else if (this.type == 'speed') {
      return 'black'
    } else if (this.type) {
      return 'white'
    }
    return '#EEEEEE'
  }

}
