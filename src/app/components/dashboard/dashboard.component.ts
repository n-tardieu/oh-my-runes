import { ChangeDetectorRef, Component, DoCheck, Input, KeyValueDiffer, KeyValueDiffers, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RunesListParams } from 'src/app/core/interfaces/runes-list-params.interfaces';
import { RunesConvertService } from 'src/app/services/runes-convert.service';
import { WizardService } from 'src/app/services/wizard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnChanges, DoCheck {

  isValid = true;

  constructor( private runesConvertService: RunesConvertService, private wizardService: WizardService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("changes ", changes);
  }

  ngDoCheck(): void {
  }

  downloadWizardJSON(): void {
     let json = this.runesConvertService.cleanFileWithRaid(this.wizardService.getWizardData())
     this.wizardService.generateWizardJSON(json)
  }

}
