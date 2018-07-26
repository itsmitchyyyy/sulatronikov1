import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BooksComponent } from "./books/books.component";
import { AuthorsComponent } from "./users/authors/authors.component";
import { AuthorListComponent } from "./users/authors/components/author-list/author-list.component";
import { ProfileComponent } from "./users/authors/components/profile/profile.component";

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
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PageRoutingModule { }