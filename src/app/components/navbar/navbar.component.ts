import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Wizard } from 'src/app/core/types/sw-wizard.types';
import { WizardService } from 'src/app/services/wizard.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
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

  resetWizard() {
    this.wizardService.clearWizardData()
  }

}
