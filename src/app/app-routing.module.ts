import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { AllRoutesComponent } from './all-my-routes/all-my-routes.component';

const routes: Routes = [
  {
    path: 'myRoutes',
    component: AllRoutesComponent
  },
  // {
  //   path: 'myRoute/new',
  //   component:
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
