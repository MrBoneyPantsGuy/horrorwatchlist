import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRouting } from './app.routing';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LoginComponent } from './components/login/login.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { ExamplePageComponent } from './pages/example-page/example-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { AddPageComponent } from './pages/add-page/add-page.component';
import { RandomSelectionPageComponent } from './pages/random-selection-page/random-selection-page.component';
import { ListOverviewPageComponent } from './pages/list-overview-page/list-overview-page.component';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatListModule} from '@angular/material/list';
import {ClipboardModule} from 'ngx-clipboard';
import { ReviewPageComponent } from './pages/review-page/review-page.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDialogModule} from '@angular/material/dialog';
import { ReviewDialogComponent } from './components/review-dialog/review-dialog.component';
import { RatingComponent } from './components/rating/rating.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { ReviewCalcComponent } from './components/review-calc/review-calc.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MovieFiltersComponent } from './components/movie-filters/movie-filters.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatSelectModule } from '@angular/material/select';
import { AvailabilityCheckComponent } from './components/availability-check/availability-check.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    LoginComponent,
    LandingPageComponent,
    MenuBarComponent,
    ExamplePageComponent,
    NotFoundPageComponent,
    AddPageComponent,
    RandomSelectionPageComponent,
    ListOverviewPageComponent,
    ReviewPageComponent,
    ReviewDialogComponent,
    RatingComponent,
    ReviewCalcComponent,
    MovieFiltersComponent,
    AvailabilityCheckComponent
  ],
    imports: [
        BrowserModule,
        AppRouting,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatDialogModule,
        MatToolbarModule,
        MatIconModule,
        MatTableModule,
        MatSortModule,
        MatListModule,
        ClipboardModule,
        MatProgressSpinnerModule,
        MatSlideToggleModule,
        MatGridListModule,
        MatTooltipModule,
        MatTabsModule,
        MatExpansionModule,
        MatSliderModule,
        MatSelectModule,
        MatProgressBarModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
