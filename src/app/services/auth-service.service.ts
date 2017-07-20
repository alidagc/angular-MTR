// your services match the routes in your API
// In this case, we have 4 routes in the auth-router in express app

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthServiceService {

  constructor(
    // "give me what http pulls, and put it inside our class so I can use it"
    private httpResults: Http
  ) { }

// POST signup
// an argument for each "req.body" in the API route
  signup(theFirstName, theLastName, theEmail, thePassword) {
    return this.httpResults
    // ajax requests (which includes post) by default send back observables/ subscriptions
    .post (
      'http://localhost:3000/api/signup',

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
    return this.httpResults
      .post (
        'http://localhost:3000/api/login',
        // Form body information to send to the back end (req.body)
        {
          UserEmail: theEmail,
          UserPassword: thePassword
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
  return this.httpResults
  .post (
    'http://localhost:3000/api/logout',
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
  return this.httpResults
    .get (
      'http://localhost:3000/api/checklogin',
      // Only needs two params
      {withCredentials: true}
    )
    // Change the callback to Promise instead of subscribe
    .toPromise()
    .then(res => res.json())
}



}
