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

  @Input()
  public params: RunesListParams = {
    isEquipedRunes: true,
    isOnlyStorageRunes: true,
    isAbort: true,
    gemGrade: 'default'
  }

  private paramsDiffer!: KeyValueDiffer<string, any>;

  constructor(private differs: KeyValueDiffers, private runesConvertService: RunesConvertService) { }

  ngOnInit() {
    this.paramsDiffer = this.differs.find(this.params).create();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("changes ", changes);
  }

  ngDoCheck(): void {
    const changes = this.paramsDiffer.diff(this.params)
    if (changes) {
      this.runesConvertService.setRunesListParams(this.params)
    }
  }

  downloadWizardJSON(): void {
    // let json = this.runeConvertService.cleanFileWithRaid()
    // this.wizardService.generateWizardJSON(json)
  }

}
