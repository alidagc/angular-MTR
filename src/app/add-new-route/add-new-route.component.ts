import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { MyTravelRoutesServiceService } from '../services/my-travel-routes-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new-route',
  templateUrl: './add-new-route.component.html',
  styleUrls: ['./add-new-route.component.css']
})
export class AddNewRouteComponent implements OnInit {

  currentUser: any = {};

  newRouteName: string;
  newRouteLocation: string;
  newRouteDescription: string;
  newRouteDuration: number;
  newRoutePins: Array<object>;
  newRoutePath: Array<object>;

  constructor(
    private authService : AuthServiceService,
    private myRoutesFromApi: MyTravelRoutesServiceService,
    private router : Router
  ) { }

  ngOnInit() {
    //checking if you are logged in
    this.authService.checklogin()
      .then((userFromApi)=>{
        this.currentUser = userFromApi;
      })
      .catch(()=>{
        this.router.navigate(['/']);
      })
  }

  saveNewRoute(){
    this.myRoutesFromApi.newRoute(
      this.newRouteName,
      this.newRouteLocation,
      this.newRouteDescription,
      this.newRouteDuration
      ) // need to add new required fields
      .subscribe((newRouteForApi) =>{
        this.router.navigate(['/myRoutes']);
      })
  }

}
