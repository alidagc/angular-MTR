// your services match the routes in your API
// In this case, we have two routes in the my routes routes in express app

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class MyTravelRoutesServiceService {
  baseUrl = "http://localhost:3000";

  constructor(
    private httpResults: Http
  ) { }

// POST Routes - make new routes
newRoute(theName, theLocation, theDescription, theDuration, theTags, thePins, thePath) {
  return this.httpResults
  .post (
    'http://localhost:3000/api/myRoutes/new',
    // Form body information to send to the backend
    {
      routeName: theName,
      routeLocation: theLocation,
      routeDescription: theDescription,
      routeDuration: theDuration,
      routeTags: theTags,
      routePins: thePins,
      routePath: thePath
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

getOneRouteApi(id){
    let endPoint = "/api/"+id
    return this.httpResults.get(this.baseUrl+endPoint,
    {withCredentials: true}
    )
    // make request to api, receive a magical Angular object
    //use .map to turn it into a regular json object
      .toPromise().then(result => result.json());
  }
}
