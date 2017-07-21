import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AuthServiceService } from './services/auth-service.service';
import { MyTravelRoutesServiceService } from './services/my-travel-routes-service.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AllRoutesComponent } from './all-routes/all-routes.component';
import { SignupComponent } from './signup/signup.component';
import { BackActiveMapComponent } from './back-active-map/back-active-map.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AllRoutesComponent,
    SignupComponent,
    BackActiveMapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    AuthServiceService,
    MyTravelRoutesServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
