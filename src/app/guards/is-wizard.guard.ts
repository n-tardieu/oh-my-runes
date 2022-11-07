import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { WizardService } from '../services/wizard.service';

@Injectable({
  providedIn: 'root'
})
export class IsWizardInGuard implements CanActivate {
  constructor(private wizardService: WizardService, private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.wizardService.getWizardData() == undefined){
      this.router.navigateByUrl('/');
      return false
    }
    return true;
  }
}
