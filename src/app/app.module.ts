import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// Material import before -> mat module
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatRadioModule} from '@angular/material/radio';
import { MatProgressBarModule} from '@angular/material/progress-bar';
import { MatCardModule} from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule} from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LevelStepperComponent } from './components/level-stepper/level-stepper.component';
import { MissionCardComponent } from './components/mission/mission-card/mission-card.component';
import { MissionsListComponent } from './components/mission/missions-list/missions-list.component';
import { TagComponent } from './components/tag/tag.component';
import { RunesListComponent } from './components/runes/runes-list/runes-list.component';
import { RuneCardComponent } from './components/runes/rune-card/rune-card.component';
import { EnchantsAndGemsParamsComponent } from './components/enchants-and-gems-params/enchants-and-gems-params.component';



@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    DashboardComponent,
    LevelStepperComponent,
    MissionCardComponent,
    MissionsListComponent,
    TagComponent,
    RunesListComponent,
    RuneCardComponent,
    EnchantsAndGemsParamsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatSelectModule,
    MatProgressBarModule,
    MatCardModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatRadioModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
