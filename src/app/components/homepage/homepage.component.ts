import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, AfterViewInit {

  // ref main_vdo in background
  @ViewChild('vdo')
  el_vdo!: ElementRef;

  constructor() { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {   
    this.el_vdo.nativeElement.playbackRate = 1 // (default 1) 
  }

}
