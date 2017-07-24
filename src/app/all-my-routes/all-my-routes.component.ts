import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { MyTravelRoutesServiceService } from '../services/my-travel-routes-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'all-my-routes',
  templateUrl: './all-my-routes.component.html',
  styleUrls: ['./all-my-routes.component.css']
})
export class AllRoutesComponent implements OnInit {

  currentUser: any = {};
  allMyRoutes: any[] = [];
  routesError: string;

  isShowingForm: boolean = false;

  newRouteName: string;
  newRouteLocation: string;
  newRouteDescription: string;
  newRouteDuration: number;
  newRouteTags: string;

  constructor(
    private authService : AuthServiceService,
    private myRoutesFromApi: MyTravelRoutesServiceService,
    private router : Router
  ) {}

  ngOnInit() {
    //checking if you are logged in
    this.authService.checklogin()
      .then((userFromApi)=>{
        this.currentUser = userFromApi;
        this.getMyRoutes();
      })
      .catch(()=>{
        this.router.navigate(['/']);
      })
  }

  getMyRoutes () {
    this.myRoutesFromApi.allRoutes()
      .subscribe((allRoutes)=>{
        this.allMyRoutes = allRoutes;
      },
      () =>{
          this.routesError = "Sorry, we can't find your routes!"
      }
    );
  } // close getMyRoutes

  // goToSingleRouteView()!!!!!!!!!!!!!
  // this.router.navigate(['/route._id']);
  //GOTTA BUILD FOR GOING TO SPECIFIC ROUTE ID URL

  showAddRouteForm(){
    this.isShowingForm = true;
  }

  saveNewRoute(){
    this.myRoutesFromApi.newRoute(this.newRouteName, this.newRouteDescription, this.newRouteDuration) // need to add new required fields
      .subscribe((newRouteForApi) =>{
        this.allMyRoutes.push(newRouteForApi);
        this.isShowingForm = false;
        this.router.navigate(['/newRouteForApi._id']);
      }
      )
  }
}
