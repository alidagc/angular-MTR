import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  firstNameValue: string;
  lastNameValue: string;
  emailValue: string;
  passwordValue: string;

  errorMessage: string;

  constructor(
    private authService : AuthServiceService,
    private router : Router

  ) { }

  ngOnInit() {
  }

  doSignUp(){
    alert('SUBMITTED');
    this.authService.signup(this.firstNameValue, this.lastNameValue, this.emailValue, this.passwordValue)
      .then((resultFromApi)=>{
        this.firstNameValue = "";
        this.lastNameValue = "";
        this.emailValue = "";
        this.passwordValue = "";
        this.errorMessage = "";

        this.router.navigate(['/']);

      })
      .catch((err)=>{
        const parsedError = err.json();
        this.errorMessage = parsedError.message;
      })
  }

}
