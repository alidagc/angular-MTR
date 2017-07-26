// Services to interact with express API

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class MyTravelRoutesServiceService {
  baseUrl = "http://localhost:3000";
  BehSub: any = new BehaviorSubject(null);

  constructor(
    private httpResults: Http
  ) { }

// Make new routes
 newRoute(theName, theLocation, theDescription, theDuration) {
  let endPoint = "/api/myRoutes/new"
  return this.httpResults.post(this.baseUrl+endPoint,
    {
      routeName: theName,
      routeLocation: theLocation,
      routeDescription: theDescription,
      routeDuration: theDuration
    },
    // Send the cookies across domains
    {withCredentials: true}
  )
  // Parse the JSON
  .map(res => res.json());
  }

// Show all routes
  allRoutes() {
    let endPoint = "/api/myRoutes"
    return this.httpResults.get(this.baseUrl+endPoint,
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
      .toPromise().then(result => {
        this.BehSub.next(result.json());
        return result.json()
      });
  }

  editRoute(routeId, theName, theLocation, theDescription, theDuration){
    let endPoint = "/api/"+ routeId +"/edit"
    return this.httpResults.put(this.baseUrl+endPoint,
      {
        routeName: theName,
        routeLocation: theLocation,
        routeDescription: theDescription,
        routeDuration: theDuration
      },
    {withCredentials: true}
    )
    // make request to api, receive a magical Angular object
    //use .map to turn it into a regular json object
      .toPromise().then(result => {
        this.BehSub.next(result.json());
        return result.json()
      });
  }

  deleteRoute(routeId){
    let endPoint = "/api/"+ routeId +"/delete"
    return this.httpResults.delete(this.baseUrl+endPoint,
      {withCredentials: true})
    }

  savePathToRoute(pathArray) {
    let endPoint = "/api/"+ this.BehSub.getValue()._id +"/newpath"
    return this.httpResults.post(this.baseUrl+endPoint,
      {
        pathArray: pathArray,
      },
    {withCredentials: true}
    )
    .toPromise().then(result => {
      this.BehSub.next(result.json());
      return result.json()
    });
  }

  deletePathFromRoute() {
    let endPoint = "/api/"+ this.BehSub.getValue()._id +"/deletepath"
    return this.httpResults.put(this.baseUrl+endPoint,
    {withCredentials: true}
    )
    .toPromise().then(result => {
      this.BehSub.next(result.json());
      return result.json()
    });
  }
}
