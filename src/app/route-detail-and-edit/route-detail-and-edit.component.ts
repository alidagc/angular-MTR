import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
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

  constructor(
    private authService : AuthServiceService,
    private myRoutesFromApi: MyTravelRoutesServiceService,
    private router : Router,
    private activatedRoute : ActivatedRoute
  ) {}

  ngOnInit() {
    console.log('route details init')
    this.authService.checklogin()
    .then((resultFromApi)=>{
      this.currentUser = resultFromApi;
      })
    .catch((err)=>{
      this.isLoggedin = false;
      this.router.navigate(['/']);
    });

    this.activatedRoute.params.subscribe((params) => {
      this.getOneRoute(params.id);
    })
} // END OF ON INIT

  showEditRouteForm(){
    this.isShowingForm = true;
  }

  getOneRoute(id){
    console.log('route ajax start')
    var x = this.myRoutesFromApi.getOneRouteApi(id)
      .then((routebyId)=>{
        console.log('route ajax succcess', routebyId)
        this.oneRoute = routebyId;
      })
     .catch(() => {
      this.oneRouteError = "Sorry, could not find your route";
    });
  }

  saveEditedRoute(){
    this.myRoutesFromApi.editRoute(
      this.oneRoute._id,
      this.oneRoute.routeName,
      this.oneRoute.location,
      this.oneRoute.description,
      this.oneRoute.duration
      )
      .then((editRouteForApi) =>{
        this.router.navigate(['/'+ this.oneRoute._id]);
        this.isShowingForm = false;
      })
  }

  deleteOneRoute(id){
    this.myRoutesFromApi.deleteRoute(id)
    .subscribe((deletedCharacter)=>{});
  }
}
