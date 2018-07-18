import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { AppMaterialModule } from "../app.material.modules";
import { HomeComponent } from "../pages/home/home.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { CarouselComponent } from "./carousel/carousel.component";
import { FooterComponent } from "./footer/footer.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { LandingPageComponent } from "../pages/landing-page/landing-page.component";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "../app.routing.module";
import { SlideshowModule } from 'ng-simple-slideshow';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        HomeComponent,
        NavbarComponent,
        CarouselComponent,
        FooterComponent,
        LoginComponent,
        RegisterComponent,
        LandingPageComponent
    ],
    exports: [
        NavbarComponent,
        CarouselComponent,
        FooterComponent,
    ],
    entryComponents: [
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppMaterialModule,
        AppRoutingModule,
        SlideshowModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }