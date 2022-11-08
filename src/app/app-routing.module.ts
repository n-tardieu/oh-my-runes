import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EnchantsAndGemsParamsComponent } from './components/enchants-and-gems-params/enchants-and-gems-params.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { IsUndefinedWizardGuard } from './guards/is-undefined-wizard.guard';
import { IsWizardInGuard } from './guards/is-wizard.guard';

const routes: Routes = [
  { path: '', component: HomepageComponent, canActivate: [IsUndefinedWizardGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [IsWizardInGuard] },
  { path: 'params', component: EnchantsAndGemsParamsComponent, canActivate: [IsWizardInGuard] },
  { path: '**', component: DashboardComponent, canActivate: [IsWizardInGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
