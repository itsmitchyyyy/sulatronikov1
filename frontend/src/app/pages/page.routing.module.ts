import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BooksComponent } from "./books/books.component";
import { AuthorsComponent } from "./users/authors/authors.component";
import { AuthorListComponent } from "./users/authors/components/author-list/author-list.component";
import { ProfileComponent } from "./users/authors/components/profile/profile.component";
import { PublishersComponent } from "./users/publishers/publishers.component";
import { PublisherListComponent } from "./users/publishers/components/publisher-list/publisher-list.component";
import { PublisherTlistComponent } from "./users/publishers/components/publisher-tlist/publisher-tlist.component";
import { PublishermanuscriptComponent } from "./users/publishers/components/publishermanuscript/publishermanuscript.component";
import { PublisherprofileComponent } from "./users/publishers/components/publisherprofile/publisherprofile.component";
import { AuthorprofileComponent } from "./users/authors/components/authorprofile/authorprofile.component";
import { AuthGuard } from "../shared/login/auth.guard";
import { AuthormanuscriptComponent } from "./users/authors/components/authormanuscript/authormanuscript.component";
import { AuthormessageComponent } from "./users/authors/components/authormessage/authormessage.component";
import { AuthortransactionComponent } from "./users/authors/components/authortransaction/authortransaction.component";
import { AuthornotificationComponent } from "./users/authors/components/authornotification/authornotification.component";
import { AuthorviewmanuscriptComponent } from "./users/authors/components/authormanuscript/components/authorviewmanuscript/authorviewmanuscript.component";
import { PublishermessageComponent } from "./users/publishers/components/publishermessage/publishermessage.component";
import { PublishertransactionComponent } from "./users/publishers/components/publishertransaction/publishertransaction.component";
import { PublishernotificationComponent } from "./users/publishers/components/publishernotification/publishernotification.component";
import { AuthorviewmessageComponent } from "./users/authors/components/authormessage/components/authorviewmessage/authorviewmessage.component";
import { PublisherviewmessageComponent } from "./users/publishers/components/publishermessage/components/publisherviewmessage/publisherviewmessage.component";
import { PublishertransactionaddonComponent } from "./users/publishers/components/publishertransaction/components/publishertransactionaddon/publishertransactionaddon.component";
import { PublisheraddmanuscriptComponent } from "./users/publishers/components/publishermanuscript/components/publisheraddmanuscript/publisheraddmanuscript.component";
import { CopywritersComponent } from "./users/copywriters/copywriters.component";
import { CopywriterlistComponent } from "./users/copywriters/components/copywriterlist/copywriterlist.component";
import { CopywriterprofileComponent } from "./users/copywriters/components/copywriterprofile/copywriterprofile.component";
import { CopywritermessageComponent } from "./users/copywriters/components/copywritermessage/copywritermessage.component";
import { CopywriterviewmessageComponent } from "./users/copywriters/components/copywritermessage/components/copywriterviewmessage/copywriterviewmessage.component";
import { PublisheditmanuscriptComponent } from "./users/publishers/components/publishermanuscript/components/publisheditmanuscript/publisheditmanuscript.component";
import { AuthoraddmanuscriptComponent } from "./users/authors/components/authormanuscript/components/authoraddmanuscript/authoraddmanuscript.component";
import { AdminComponent } from "./users/admin/admin.component";
import { AccountsComponent } from "./users/admin/components/accounts/accounts.component";

const routes: Routes = [
    {
        path: 'books',
        component: BooksComponent
    },
    {
        path: 'authors',
        component: AuthorsComponent,
        children: [
            {
                path: 'list',
                component: AuthorListComponent
            },
            {
                path: 'profile/:id',
                component: ProfileComponent
            },
            {
                path: 'profile/:id/edit',
                component: AuthorprofileComponent
            },
            {
                path: 'profile/:id/manuscript',
                component: AuthormanuscriptComponent,
            },
            {
                path: 'profile/:id/manuscript/add',
                component: AuthoraddmanuscriptComponent
            },
            {
                path: 'profile/:id/manuscript/:manuscriptId/edit',
                component: AuthorviewmanuscriptComponent
            },
            {
                path: 'profile/:id/message',
                component: AuthormessageComponent,
            },
            {
                path: 'profile/:id/message/:pubID',
                component: AuthormessageComponent
            },
            {
                path: 'profile/:id/message/:pubID/conversation/:mesID',
                component: AuthorviewmessageComponent
            },
            {
                path: 'profile/:id/transaction',
                component: AuthortransactionComponent
            },
            {
                path: 'profile/:id/notification',
                component: AuthornotificationComponent
            }
        ],
        canActivate: [AuthGuard]
    },
    {
        path: 'publishers',
        component: PublishersComponent,
        children: [
            {
                path: 'list',
                component: PublisherTlistComponent
            },
            {
                path: 'profile/:id',
                component: PublisherListComponent
            },
            {
                path: 'profile/:id/books',
                component: PublishermanuscriptComponent,
            },
            {
                path: 'profile/:id/books/add',
                component: PublisheraddmanuscriptComponent
            },
            {
                path: 'profile/:id/books/:bookID/edit',
                component: PublisheditmanuscriptComponent
            },
            {
                path: 'profile/:id/edit',
                component: PublisherprofileComponent
            },
            {
                path: 'profile/:id/message',
                component: PublishermessageComponent
            },
            {
                path: 'profile/:id/message/:authID',
                component: PublishermessageComponent
            },
            {
                path: 'profile/:id/message/:authID/conversation/:mesID',
                component: PublisherviewmessageComponent
            },
            {
                path: 'profile/:id/writer',
                component: PublishertransactionComponent
            },
            {
                path: 'profile/:id/writer/add',
                component: PublishertransactionaddonComponent
            },
            {
                path: 'profile/:id/notification',
                component: PublishernotificationComponent
            }
        ],
        canActivate: [AuthGuard]
    },
    {
        path: 'writers',
        component: CopywritersComponent,
        children: [
            {
                path: 'list',
                component: CopywriterlistComponent
            },
            {
                path: 'profile/:id/edit',
                component: CopywriterprofileComponent
            },
            {
                path: 'profile/:id/message',
                component: CopywritermessageComponent
            },
            {
                path: 'profile/:id/message/:authID',
                component: CopywritermessageComponent
            },
            {
                path: 'profile/:id/message/:authID/conversation/:mesID',
                component: CopywriterviewmessageComponent
            },
        ],
        canActivate: [AuthGuard]
    },
    {
        path: 'admin',
        component: AdminComponent,
        children: [
            {
                path: 'accounts',
                component: AccountsComponent
            }
        ],
        canActivate: [AuthGuard]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PageRoutingModule { }