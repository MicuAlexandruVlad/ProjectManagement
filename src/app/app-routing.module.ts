import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { ProfileSetupComponent } from './profile-setup/profile-setup.component';


const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'profile-setup', component: ProfileSetupComponent },
  { path: '**', redirectTo: 'welcome' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
