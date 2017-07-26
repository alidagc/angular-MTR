// your services match the routes in your API
// In this case, we have 4 routes in the auth-router in express app

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';


@Injectable()
export class AuthServiceService {
  baseUrl = environment.apiBase;
  constructor(
    // "give me what http pulls, and put it inside our class so I can use it"
    private httpResults: Http
  ) { }

// POST signup
// an argument for each "req.body" in the API route
  signup(theFirstName, theLastName, theEmail, thePassword) {
    let endPoint = "/api/signup"
    return this.httpResults.post(this.baseUrl+endPoint,
      // Form body information to send to the back end (req.body)
      {
        signupFirstName: theFirstName,
        signupLastName: theLastName,
        signupEmail: theEmail,
        signupPassword: thePassword
      },
      // Send the cookies across domains. Password need this to work.
      {withCredentials: true}
    )

    // Change the callback to Promise instead of subscribe
    .toPromise()
    .then(res => res.json())
  }

// POST login
  login(theEmail, thePassword) {
    let endPoint = "/api/login"
    return this.httpResults.post(this.baseUrl+endPoint,
        // Form body information to send to the back end (req.body)
        {
          userEmail: theEmail,
          userPassword: thePassword
        },
        // Send the cookies across domains. Password need this to work.
        {withCredentials: true}
      )
      // Change the callback to Promise instead of subscribe
      .toPromise()
      .then(res => res.json())
  }

// POST logout
logout() {
  let endPoint = "/api/logout"
  return this.httpResults.post(this.baseUrl+endPoint,
    // No information to send to the back end (req.body)
    {},
    // Send the cookies across domains. Password need this to work.
    {withCredentials: true}
  )
  // Change the callback to Promise instead of subscribe
  .toPromise()
  .then(res => res.json());
}

// GET checklogin
checklogin() {
  let endPoint = "/api/checklogin"
  return this.httpResults.get(this.baseUrl+endPoint,
      // Only needs two params
      {withCredentials: true}
    )
    // Change the callback to Promise instead of subscribe
    .toPromise()
    .then(res => res.json())
}



}
