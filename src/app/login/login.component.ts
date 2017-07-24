import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginEmail: string;
  loginPassword: string;
  errorMessage: string;
  loginErrorMessage: string;

  constructor(
    private authService : AuthServiceService,
    private router : Router
  ) { }

  ngOnInit() {
    this.authService.checklogin()
    .then((resultFromApi)=>{
      // this.router.navigate(['/']);
    })
    .catch((err)=>{})
  }

  doLogIn(){
    this.authService.login(this.loginEmail, this.loginPassword)
    .then ((resultFromApi)=>{
      this.loginEmail = "";
      this.loginPassword = "";
      this.loginErrorMessage = "";
      this.router.navigate(['/']);
    })
    .catch((err)=>{
      const parsedError = err.json();
      this.loginErrorMessage = parsedError.message
    });
  }
}
