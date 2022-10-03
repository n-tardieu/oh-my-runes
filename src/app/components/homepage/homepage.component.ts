import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Rune } from 'src/app/core/models/rune.model';
//import { Subscription} from "rxjs/Subscription"
import { RuneService } from 'src/app/services/rune.service';
import { WizardService } from 'src/app/services/wizard.service';



@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, AfterViewInit {

  // ref main_vdo in background
  @ViewChild('vdo')
  el_vdo!: ElementRef;

  fileToUpload: File | null = null;
  data: any;
  isValid = false;

  runes: Rune[] = []
  // runeSubscription: Subscription;

  constructor(private runeService: RuneService, private wizardService: WizardService) { }

  ngOnInit(): void {
    /*
    this.runeSubscription = this.runeService.runesSubject$.subscribe((runes: Rune[]) => {
      this.runes = runes 
    })
    */
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
      const wizard_data = JSON.parse(fileReader.result as string);
     
      this.wizardService.setWizard(wizard_data)
      console.log('json ', wizard_data);
    };
    this.isValid = true
    console.log("handle ", this.fileToUpload);

  }

  openDialog() {
    //  this.isDialogOpen = true
    //  this.dialog.open(LoadingDialogComponent, { disableClose: true });
  }

}


