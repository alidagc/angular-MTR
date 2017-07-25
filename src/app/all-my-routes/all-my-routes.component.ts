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

  }
