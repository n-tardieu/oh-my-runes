import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Wizard } from './core/types/sw-wizard.types';
import { WizardService } from './services/wizard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ohmyrunes';
  public wizardHasSet: boolean = false;

  wizardSubscription: Subscription = new Subscription

  constructor(private wizardService: WizardService) { }

  ngOnInit() {
    if (this.wizardService.getWizardData() !== undefined) this.wizardHasSet = true
    this.wizardSubscription = this.wizardService.wizardSubject$.subscribe((wizard: Wizard) => {
      if (wizard == undefined) {
        this.wizardHasSet = false
      } else {
        this.wizardHasSet = true
      }
    })
  }
}
