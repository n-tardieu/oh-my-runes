import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EnchantsAndGemsParamsComponent } from './components/enchants-and-gems-params/enchants-and-gems-params.component';
import { HomepageComponent } from './components/homepage/homepage.component';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'params', component: EnchantsAndGemsParamsComponent},
  {path: '**', component: HomepageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
