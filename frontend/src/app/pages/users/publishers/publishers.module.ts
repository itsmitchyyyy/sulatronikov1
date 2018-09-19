import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { SharedModule } from "../../../shared/shared.module";
import { BrowserModule } from "@angular/platform-browser";
import { PageRoutingModule } from "../../page.routing.module";
import { AppMaterialModule } from "../../../app.material.modules";
import { PublishersComponent } from "./publishers.component";
import { PublisherListComponent } from "./components/publisher-list/publisher-list.component";
import { PublisherTlistComponent } from './components/publisher-tlist/publisher-tlist.component';
@NgModule({
    declarations: [PublishersComponent, PublisherListComponent, PublisherTlistComponent],
    exports: [PublishersComponent, PublisherListComponent, PublisherTlistComponent],
    imports: [
        SharedModule,
        BrowserModule,
        PageRoutingModule,
        AppMaterialModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PublisherModule { }