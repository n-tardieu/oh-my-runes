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



@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent
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
