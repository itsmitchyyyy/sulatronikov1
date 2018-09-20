import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { SharedModule } from "../../../shared/shared.module";
import { BrowserModule } from "@angular/platform-browser";
import { PageRoutingModule } from "../../page.routing.module";
import { AppMaterialModule } from "../../../app.material.modules";
import { AuthorsComponent } from "./authors.component";
import { AuthorListComponent } from './components/author-list/author-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthorprofileComponent } from './components/authorprofile/authorprofile.component';
import { AuthormanuscriptComponent } from "./components/authormanuscript/authormanuscript.component";
import { AuthormessageComponent } from './components/authormessage/authormessage.component';
import { AuthortransactionComponent } from './components/authortransaction/authortransaction.component';
import { AuthornotificationComponent } from './components/authornotification/authornotification.component';
@NgModule({
    declarations: [AuthorsComponent, AuthorListComponent, ProfileComponent, AuthorprofileComponent, AuthormanuscriptComponent, AuthormessageComponent, AuthortransactionComponent, AuthornotificationComponent],
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