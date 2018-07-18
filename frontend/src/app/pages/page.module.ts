import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BooksComponent } from './books/books.component';
import { PageRoutingModule } from "./page.routing.module";
import { AppMaterialModule } from "../app.material.modules";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
    declarations: [BooksComponent],
    exports: [],
    imports: [
        BrowserModule,
        PageRoutingModule,
        AppMaterialModule
    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PageModule { }