import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { SharedModule } from "../../../shared/shared.module";
import { BrowserModule } from "@angular/platform-browser";
import { PageRoutingModule } from "../../page.routing.module";
import { AppMaterialModule } from "../../../app.material.modules";
import { AdminComponent } from "./admin.component";
import { AccountsComponent } from "./components/accounts/accounts.component";

@NgModule({
    imports: [
        SharedModule,
        BrowserModule,
        PageRoutingModule,
        AppMaterialModule,
    ],
    exports: [
        AdminComponent,
        AccountsComponent
    ],
    declarations: [
        AdminComponent,
        AccountsComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AdminModule { }