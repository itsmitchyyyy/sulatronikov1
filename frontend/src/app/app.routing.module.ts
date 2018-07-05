import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './shared/login/auth.guard';
const Routes = [
    {
        path: '', redirectTo: 'home', pathMatch: 'full',
    },
    {
        path: 'home', component: LandingPageComponent
    },
    {
      path: 'listings', component: HomeComponent
    }
]
@NgModule({
  imports: [
    RouterModule.forRoot(Routes, { useHash: true})
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }