import { Component, Input, KeyValueDiffer, KeyValueDiffers, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { RunesListParams } from 'src/app/core/interfaces/runes-list-params.interfaces';
import { RunesConvertService } from 'src/app/services/runes-convert.service';
import { WizardService } from 'src/app/services/wizard.service';

@Component({
  selector: 'app-enchants-and-gems-params',
  templateUrl: './enchants-and-gems-params.component.html',
  styleUrls: ['./enchants-and-gems-params.component.scss']
})
export class EnchantsAndGemsParamsComponent implements OnInit {

  isValid = true;

  @Input()
  public params!: RunesListParams

  private paramsDiffer!: KeyValueDiffer<string, any>;
  paramsSubscription: Subscription = new Subscription


  constructor(private differs: KeyValueDiffers, private runesConvertService: RunesConvertService, private wizardService: WizardService) { }

  ngOnInit() {
    this.params = this.runesConvertService.getRunesListParams()
    this.paramsSubscription = this.runesConvertService.runesListParamsSubject$.subscribe((params: any) => {
      this.params = params 
    })

    this.paramsDiffer = this.differs.find(this.params).create();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("changes ", changes);
    this.runesConvertService.setRunesListParams(this.params)
  }

  ngDoCheck(): void {
    const changes = this.paramsDiffer.diff(this.params)
    if (changes) {
      this.runesConvertService.setRunesListParams(this.params)
    }
  }

  downloadWizardJSON(): void {
     let json = this.runesConvertService.cleanFileWithRaid(this.wizardService.getWizardData())
     this.wizardService.generateWizardJSON(json)
  }

}
