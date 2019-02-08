import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { SharedModule } from "../../../shared/shared.module";
import { BrowserModule } from "@angular/platform-browser";
import { PageRoutingModule } from "../../page.routing.module";
import { AppMaterialModule } from "../../../app.material.modules";
import { PublishersComponent } from "./publishers.component";
import { PublisherListComponent } from "./components/publisher-list/publisher-list.component";
import { PublisherTlistComponent } from './components/publisher-tlist/publisher-tlist.component';
import { PublisherprofileComponent } from './components/publisherprofile/publisherprofile.component';
import { PublishermanuscriptComponent } from './components/publishermanuscript/publishermanuscript.component';
import { PublishermessageComponent } from './components/publishermessage/publishermessage.component';
import { PublishertransactionComponent } from './components/publishertransaction/publishertransaction.component';
import { PublishernotificationComponent } from './components/publishernotification/publishernotification.component';
import { PublisherviewmessageComponent } from './components/publishermessage/components/publisherviewmessage/publisherviewmessage.component';
import { PublishertransactionaddonComponent } from './components/publishertransaction/components/publishertransactionaddon/publishertransactionaddon.component';
import { PublisheraddmanuscriptComponent } from './components/publishermanuscript/components/publisheraddmanuscript/publisheraddmanuscript.component';
import { PublisheditmanuscriptComponent } from './components/publishermanuscript/components/publisheditmanuscript/publisheditmanuscript.component';
import { PublishertransactionassignComponent } from './components/publishertransaction/components/publishertransactionassign/publishertransactionassign.component';
@NgModule({
    declarations: [
        PublishersComponent,
        PublisherListComponent,
        PublisherTlistComponent,
        PublisherprofileComponent,
        PublishermanuscriptComponent,
        PublishermessageComponent,
        PublishertransactionComponent,
        PublishernotificationComponent,
        PublisherviewmessageComponent,
        PublishertransactionaddonComponent,
        PublisheraddmanuscriptComponent,
        PublisheditmanuscriptComponent,
        PublishertransactionassignComponent,
    ],
    exports: [
        PublishersComponent,
        PublisherListComponent,
        PublisherTlistComponent,
        PublisherprofileComponent,
        PublishermanuscriptComponent
    ],
    imports: [
        SharedModule,
        BrowserModule,
        PageRoutingModule,
        AppMaterialModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PublisherModule { }