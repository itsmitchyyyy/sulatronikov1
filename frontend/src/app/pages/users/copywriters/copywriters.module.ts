import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CopywritersComponent } from './copywriters.component';
import { CopywriterlistComponent } from './components/copywriterlist/copywriterlist.component';
import { CopywriterprofileComponent } from './components/copywriterprofile/copywriterprofile.component';
import { SharedModule } from "../../../shared/shared.module";
import { BrowserModule } from "@angular/platform-browser";
import { PageRoutingModule } from "../../page.routing.module";
import { AppMaterialModule } from "../../../app.material.modules";
import { CopywritermessageComponent } from './components/copywritermessage/copywritermessage.component';
import { CopywriterviewmessageComponent } from './components/copywritermessage/components/copywriterviewmessage/copywriterviewmessage.component';

@NgModule({
    declarations: [CopywritersComponent, CopywriterlistComponent, CopywriterprofileComponent, CopywritermessageComponent, CopywriterviewmessageComponent],
    exports: [CopywritersComponent],
    imports: [
        SharedModule,
        BrowserModule,
        PageRoutingModule,
        AppMaterialModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class CopyWriterModule { }