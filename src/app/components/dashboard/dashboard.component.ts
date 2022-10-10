import { Component, OnInit } from '@angular/core';
import { RunesConvertService } from 'src/app/services/runes-convert.service';
import { WizardService } from 'src/app/services/wizard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isValid = false;

  // TODO implement form for generate JSON
  // form
  public isEquipedRunes = true;
  public isOnlyStorageRunes = true;
  public isAbort = true;
  public gemGrade = 'hero';


  constructor(private runeConvertService: RunesConvertService, private wizardService: WizardService) { }

  ngOnInit() {
  }

  downloadWizardJSON(): void {
    let json = this.runeConvertService.cleanFileWithRaid()
    this.wizardService.generateWizardJSON(json)
  }

}
