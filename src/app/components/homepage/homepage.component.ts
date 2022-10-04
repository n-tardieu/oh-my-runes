import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Rune } from 'src/app/core/models/rune.model';
//import { Subscription} from "rxjs/Subscription"
import { RuneService } from 'src/app/services/rune.service';
import { RunesConvertService } from 'src/app/services/runes-convert.service';
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

  // TODO implement form for generate JSON
  // form
  public isEquipedRunes = true;
  public isOnlyStorageRunes = true;
  public isAbort = true;
  public gemGrade = 'hero';

  runes: Rune[] = []
  // runeSubscription: Subscription;

  constructor(private runeService: RuneService, private wizardService: WizardService, private runeConvertService: RunesConvertService) { }

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

  chooseWizardFile(): void {
    (document.querySelector('input') as HTMLInputElement).click()
  }

  downloadWizardJSON(): void {
    let json = this.runeConvertService.cleanFileWithRaid()
    this.wizardService.generateWizardJSON(json)
  }

  handle(event: any) {
    this.fileToUpload = event.target.files[0]
    // adapt data
    const fileReader = new FileReader();
    fileReader.readAsText(this.fileToUpload as File, "UTF-8");
    fileReader.onload = () => {
      const wizard_data = JSON.parse(fileReader.result as string);
      this.wizardService.setWizard(wizard_data)
    };
    this.isValid = true
  }

  openDialog() {
    //  this.isDialogOpen = true
    //  this.dialog.open(LoadingDialogComponent, { disableClose: true });
  }

  resetFile(){
    (document.querySelector('input') as HTMLInputElement).value = "";
    this.isValid = false
  }

}


