import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { ProfileSetupComponent } from './profile-setup/profile-setup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectPageComponent } from './project-page/project-page.component';
import { AddProjectComponent } from './add-project/add-project.component';


const routes: Routes = [
  { path: 'welcome', component: WelcomeComponent },
  { path: 'profile-setup', component: ProfileSetupComponent },
  { path: 'dashboard', component: DashboardComponent, children: [
    { path: 'projects', component: ProjectPageComponent }
  ]},
  { path: 'add-project', component: AddProjectComponent },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
