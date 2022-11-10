import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Rune } from 'src/app/core/models/rune.model';
import { RuneService } from 'src/app/services/rune.service';
import { RunesConvertService } from 'src/app/services/runes-convert.service';
import { WizardService } from 'src/app/services/wizard.service';

@Component({
  selector: 'app-runes-list',
  templateUrl: './runes-list.component.html',
  styleUrls: ['./runes-list.component.scss']
})
export class RunesListComponent implements OnInit {


  @Input()
  public runes: Rune[] = []
  runeSubscription: Subscription = new Subscription;

  constructor(private runeService: RuneService, private runesConvertService: RunesConvertService, private wizardService: WizardService) { }

  ngOnInit(): void {
    const runesUpdated = this.runesConvertService.useRuneForge(this.wizardService.getWizardData())
    this.runeService.setRunes(runesUpdated)
    this.getRunes()
  }

  getRunes() {
    this.runes = this.runeService.getRunes()
    this.runeSubscription = this.runeService.runesSubject$.subscribe((runes: Rune[]) => {
      this.runes = runes
    })
  }

}
