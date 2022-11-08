import { AfterViewInit, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Rune } from 'src/app/core/models/rune.model';
import { Wizard } from 'src/app/core/types/sw-wizard.types';
//import { Subscription} from "rxjs/Subscription"
import { RuneService } from 'src/app/services/rune.service';
import { RunesConvertService } from 'src/app/services/runes-convert.service';
import { WizardService } from 'src/app/services/wizard.service';

import _jsonWizard from "../../../assets/json/wizard-070722.json";


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, AfterViewInit, OnChanges {

  // ref main_vdo in background
  @ViewChild('vdo')
  el_vdo!: ElementRef;

  fileToUpload: File | null = null;
  data: any;
  isValid = false;

  public isDemonstration: boolean = false
  wizard_data: Wizard | undefined;


  runes: Rune[] = []
  // runeSubscription: Subscription;

  constructor(private router: Router, private wizardService: WizardService, private runeService: RuneService, private runeConvertService: RunesConvertService) { }

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


  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes ', changes);
    if (this.isDemonstration == true) {
      this.handleDemo(_jsonWizard)
    } else {
      this.resetFile()
    }
  }

  chooseWizardFile(): void {
    (document.querySelector('input') as HTMLInputElement).click()
  }

  downloadWizardJSON(): void {
    // let json = this.runeConvertService.cleanFileWithRaid()
    // this.wizardService.generateWizardJSON(json)
  }

  moveToDashbord(): void {
    if (this.wizard_data !== undefined) {
      this.router.navigate(['/dashboard']);
      this.feedServices(this.wizard_data)
    }
    // this.runeConvertService.cleanFileWithRaid() //TODO
  }

  handleDemo(json: Wizard) {
    this.wizard_data = json
    this.isValid = true
  }

  handle(event: any) {
    this.fileToUpload = event.target.files[0]
    // adapt data
    const fileReader = new FileReader();
    fileReader.readAsText(this.fileToUpload as File, "UTF-8");
    fileReader.onload = () => {
      this.wizard_data = JSON.parse(fileReader.result as string);

    };
    this.isValid = true
  }

  resetFile() {
    (document.querySelector('input') as HTMLInputElement).value = "";
    this.wizardService.clearWizardData()
    this.isDemonstration = false
    this.isValid = false
  }

  feedServices(wizard_data: Wizard) {
    this.wizardService.setWizard(wizard_data)
    this.runeService.setRunes(this.runeConvertService.useRuneForge(wizard_data))
  }

}


