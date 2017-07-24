import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { MyTravelRoutesServiceService } from '../services/my-travel-routes-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-route-detail-and-edit',
  templateUrl: './route-detail-and-edit.component.html',
  styleUrls: ['./route-detail-and-edit.component.css']
})
export class RouteDetailAndEditComponent implements OnInit {
  isShowingForm: boolean = false;
  routeTags: Array<string> = ["test1", "test2", "test3"]; // THIS NEEDS TO BE DYNAMIC


  constructor(
    private authService : AuthServiceService,
    private myRoutesFromApi: MyTravelRoutesServiceService,
    private router : Router
  ) { }

  ngOnInit() {
  }

  showEditRouteForm(){
    this.isShowingForm = true;
  }

  // saveEditedRoute() { //NEED TO CREATE THIS
  //
  // }
}
