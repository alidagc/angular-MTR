import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllRoutesComponent } from './all-my-routes/all-my-routes.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { RouteDetailAndEditComponent } from './route-detail-and-edit/route-detail-and-edit.component';

const routes: Routes = [
  {
    path: 'myRoutes',
    component: AllRoutesComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'routeID', //this needs to be dynamic
    component: RouteDetailAndEditComponent
  },
  { path: '**', redirectTo: '' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
