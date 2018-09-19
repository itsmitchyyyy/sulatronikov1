import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './shared/login/auth.guard';
import { ProfileComponent } from './shared/profile/profile.component';
const Routes = [
    {
        path: '', redirectTo: 'home', pathMatch: 'full',
    },
    {
        path: 'home', component: LandingPageComponent
    },
    {
      path: 'listings', component: HomeComponent, canActivate: [AuthGuard]
    },
    {
      path: 'profile', component: ProfileComponent
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