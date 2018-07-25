import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BooksComponent } from "./books/books.component";
import { AuthorsComponent } from "./users/authors/authors.component";

const routes: Routes = [
    {
        path: 'books',
        component: BooksComponent
    },
    {
        path: 'authors',
        component: AuthorsComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PageRoutingModule { }