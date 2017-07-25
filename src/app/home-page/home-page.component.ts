import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  isLoggedin: boolean = true;
  currentUser: any = {};

  constructor(
    private authService : AuthServiceService,
    private router : Router
  ) { }

  ngOnInit() {
    this.authService.checklogin()
    .then((resultFromApi)=>{
      this.currentUser = resultFromApi;
      this.router.navigate(['/']);
    })
    .catch((err)=>{
      this.isLoggedin = false;
    })
  }

}
