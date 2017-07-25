import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { MyTravelRoutesServiceService } from '../services/my-travel-routes-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-route-detail-and-edit',
  templateUrl: './route-detail-and-edit.component.html',
  styleUrls: ['./route-detail-and-edit.component.css']
})
export class RouteDetailAndEditComponent implements OnInit {

  isLoggedin: boolean = true;
  currentUser: any = {};
  oneRoute: any = {};
  oneRouteError: string;
  isShowingForm: boolean = false;
  editRouteName: string = "";

  routeTags: Array<string> = this.oneRoute.tags; // THIS NEEDS TO BE DYNAMIC

  constructor(
    private authService : AuthServiceService,
    private myRoutesFromApi: MyTravelRoutesServiceService,
    private router : Router,
    private activatedRoute : ActivatedRoute
  ) { }

  ngOnInit() {
    this.authService.checklogin()
    .then((resultFromApi)=>{
      this.currentUser = resultFromApi;
      })
    .catch((err)=>{
      this.isLoggedin = false;
    });

    this.activatedRoute.params.subscribe((params) => {
      this.getOneRoute(params.id);
    })
}

  showEditRouteForm(){
    this.isShowingForm = true;
  }

  getOneRoute(id){
    this.myRoutesFromApi.getOneRouteApi(id)
      .then((routebyId)=>{
        console.log(routebyId)
        this.oneRoute = routebyId;
      },
    () => {
      this.oneRouteError = "Sorry, could not find your route";
    });
  }
}
