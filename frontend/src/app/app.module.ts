import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { AppMaterialModule } from './app.material.modules';
import { CarouselComponent } from './shared/carousel/carousel.component';
import { FooterComponent } from './shared/footer/footer.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './shared/login/login.component';
import { RegisterComponent } from './shared/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routing.module';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    CarouselComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    AppMaterialModule,
    NgbModule.forRoot(),
    HttpClientModule,
    AppRoutingModule
  ],
  entryComponents: [
    LoginComponent,
    RegisterComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
