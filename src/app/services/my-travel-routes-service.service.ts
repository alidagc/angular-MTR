// your services match the routes in your API
// In this case, we have two routes in the my routes routes in express app

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class MyTravelRoutesServiceService {

  constructor(
    private httpResults: Http
  ) { }

// POST Routes - make new routes
newRoute(theName, theDescription, theDuration) {
  return this.httpResults
  .post (
    'http://localhost:3000/api/myRoutes/new',
    // Form body information to send to the backend
    {
      routeName: theName,
      routeDescription: theDescription,
      routeDuration: theDuration
    },
    // Send the cookies across domains
    {withCredentials: true}
  )
  // Parse the JSON
  .map(res => res.json());
}


// GET Routes - show all routes
allRoutes() {
  return this.httpResults
  .get(
    'http://localhost:3000/api/myRoutes',
    {withCredentials: true}
  )
  .map(res => res.json());
}

}
