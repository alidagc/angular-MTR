import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';

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

  constructor(
    private authService : AuthServiceService
  ) { }

  ngOnInit() {
  }

  doSignUp(){
    alert('SUBMITTED');
    this.authService.signup(this.firstNameValue, this.lastNameValue, this.emailValue, this.passwordValue)
      .then((resultFromApi)=>{
        alert('Sign up worked! ' + resultFromApi._id)
        console.log(resultFromApi);
      })
      .catch((err)=>{
        alert('Error!');
        console.log(err);
      })
  }

}
