import { AfterViewInit, Component, ElementRef, OnInit, ngOnDestroy , ViewChild } from '@angular/core';
import { Subscription} from "rxjs/Subscription"
import { Rune } from '../core/models/rune.model';
import { RuneService } from 'src/app/services/rune.service';



@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, AfterViewInit, ngOnDestroy {

  // ref main_vdo in background
  @ViewChild('vdo')
  el_vdo!: ElementRef;

  fileToUpload: File | null = null;
  data: any;
  isValid = false;

  runes: Rune[] = []
  runeSubscription: Subscription;

  constructor(private runeService: RuneService) { }

  ngOnInit(): void {
    this.runeSubscription = this.runeService.runesSubject$.subscribe((runes: Rune[]) => {
      this.runes = runes 
    })
   }

  ngAfterViewInit(): void {
    this.el_vdo.nativeElement.playbackRate = 1 // (default 1) 
  }

  chooseFile(): void {
    (document.querySelector('input') as HTMLInputElement).click()
  }

  handle(event: any) {
    this.fileToUpload = event.target.files[0]
    // adapt data
    const fileReader = new FileReader();
    fileReader.readAsText(this.fileToUpload as File, "UTF-8");
    fileReader.onload = () => {
      this.data = JSON.parse(fileReader.result as string);
    };
    this.isValid = true
    console.log("handle ", this.fileToUpload);
    
  }

}


