import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { SharedModule } from "../../../shared/shared.module";
import { BrowserModule } from "@angular/platform-browser";
import { PageRoutingModule } from "../../page.routing.module";
import { AppMaterialModule } from "../../../app.material.modules";
import { AuthorsComponent } from "./authors.component";
import { AuthorListComponent } from './components/author-list/author-list.component';
import { ProfileComponent } from './components/profile/profile.component';
@NgModule({
    declarations: [AuthorsComponent, AuthorListComponent, ProfileComponent],
    exports: [AuthorsComponent, AuthorListComponent],
    imports: [
        SharedModule,
        BrowserModule,
        PageRoutingModule,
        AppMaterialModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthorModule { }