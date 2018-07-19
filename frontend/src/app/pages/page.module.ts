import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BooksComponent } from './books/books.component';
import { PageRoutingModule } from "./page.routing.module";
import { AppMaterialModule } from "../app.material.modules";
import { BrowserModule } from "@angular/platform-browser";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [BooksComponent],
    exports: [],
    imports: [
        BrowserModule,
        PageRoutingModule,
        AppMaterialModule,
        SharedModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PageModule { }