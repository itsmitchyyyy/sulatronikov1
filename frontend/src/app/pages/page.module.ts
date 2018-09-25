import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BooksComponent } from './books/books.component';
import { PageRoutingModule } from "./page.routing.module";
import { AppMaterialModule } from "../app.material.modules";
import { BrowserModule } from "@angular/platform-browser";
import { SharedModule } from "../shared/shared.module";
import { AuthorModule } from "./users/authors/authors.module";
import { PublisherModule } from "./users/publishers/publishers.module";
import { CopyWriterModule } from "./users/copywriters/copywriters.module";
import { AdminModule } from "./users/admin/admin.module";

@NgModule({
    declarations: [BooksComponent],
    exports: [],
    imports: [
        SharedModule,
        BrowserModule,
        AuthorModule,
        PublisherModule,
        CopyWriterModule,
        AdminModule,
        PageRoutingModule,
        AppMaterialModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PageModule { }