import { Component, OnInit, Inject, NgZone } from '@angular/core';
import { AuthServiceService } from './services/auth-service.service';
import { MyTravelRoutesServiceService } from './services/my-travel-routes-service.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';

declare const google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

// FOR AUTH
  currentUser: any;
  logoutError: string;

// FOR SHOWING AND HIDING
  isLoggedIn: boolean;
  pinFormShowing: boolean = false;
  pinWindowShowing: boolean = false;

// FOR PATH
  poly: any;
  arrayOfPoints: Array<any>;

// TO SAVE THE PIN
  theRouteId: any;
  newPinName: any;
  newPinDeets: any;
  newPinDuration: any;
  pinLat: any;
  pinLng: any;
  newPinID: any;

  currentPin:any;

// TO SHOW THE PINS:
  allThePins: Array<any>;


  constructor(
    private authService : AuthServiceService,
    private routeService : MyTravelRoutesServiceService,
    private router : Router,
    private activatedRoute : ActivatedRoute,
    private autoZone: NgZone
  ) { }

    ngOnInit() {
      this.authService.checklogin()
      .then((resultFromApi)=>{
        this.currentUser = resultFromApi;
        this.router.navigate(['/']);
        this.isLoggedIn = true;
      })
      .catch((err)=>{
        this.isLoggedIn = false;
      })

      const myComponent = this;

      // // Renders the path of the current route
      // this.routeService.BehSub.subscribe(singleRoute => {
      //   if (singleRoute) {
      //     this.redrawPath(singleRoute.path);
      //   }
      // })

      const myMap = {
          center: new google.maps.LatLng(40.729589601719894, -74.00004386901855),
          zoom:15,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          mapTypeControl: true,
          mapTypeControlOptions: {
              style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
            position: google.maps.ControlPosition.RIGHT_BOTTOM
          },
          styles: [
            {
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#444444"
                    }
                ]
            },
            {
                "featureType": "administrative.country",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "saturation": "-88"
                    },
                    {
                        "lightness": "71"
                    },
                    {
                        "gamma": "10.00"
                    }
                ]
            },
            {
                "featureType": "administrative.country",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "saturation": "-100"
                    },
                    {
                        "lightness": "57"
                    }
                ]
            },
            {
                "featureType": "administrative.country",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative.province",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "saturation": "-37"
                    },
                    {
                        "lightness": "49"
                    },
                    {
                        "gamma": "1.02"
                    }
                ]
            },
            {
                "featureType": "administrative.province",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "lightness": "-100"
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative.locality",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "saturation": "100"
                    },
                    {
                        "lightness": "71"
                    },
                    {
                        "gamma": "1.02"
                    }
                ]
            },
            {
                "featureType": "administrative.locality",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "gamma": "0.00"
                    },
                    {
                        "lightness": "68"
                    },
                    {
                        "hue": "#b100ff"
                    },
                    {
                        "saturation": "-61"
                    }
                ]
            },
            {
                "featureType": "administrative.locality",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative.neighborhood",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "lightness": "40"
                    }
                ]
            },
            {
                "featureType": "administrative.neighborhood",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#f2f2f2"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "weight": "0.01"
                    },
                    {
                        "saturation": "-100"
                    },
                    {
                        "lightness": "23"
                    }
                ]
            },
            {
                "featureType": "poi.attraction",
                "elementType": "all",
                "stylers": [
                    {
                        "lightness": "44"
                    }
                ]
            },
            {
                "featureType": "poi.business",
                "elementType": "all",
                "stylers": [
                    {
                        "lightness": "4"
                    }
                ]
            },
            {
                "featureType": "poi.school",
                "elementType": "all",
                "stylers": [
                    {
                        "lightness": "23"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 45
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    },
                    {
                        "saturation": "-23"
                    },
                    {
                        "gamma": "0.80"
                    },
                    {
                        "lightness": "0"
                    },
                    {
                        "weight": "3.77"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "saturation": "-100"
                    },
                    {
                        "lightness": "19"
                    },
                    {
                        "weight": "2.62"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "lightness": "27"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#97ece5"
                    },
                    {
                        "visibility": "on"
                    },
                    {
                        "lightness": "-4"
                    },
                    {
                        "saturation": "-100"
                    },
                    {
                        "gamma": "1.37"
                    }
                ]
            }
          ]
          };
      const map = new google.maps.Map(document.getElementById("gmap"), myMap);
      map.setOptions({disableDoubleClickZoom: true });

// MAKING PATHS -----------------------------------------
      this.poly = new google.maps.Polyline({
          strokeColor: '#FFB157',
          strokeOpacity: 1.0,
          strokeWeight: 3,
          draggable: true,
          editable: true
        });
        this.poly.setMap(map);

      map.addListener('rightclick', addLatLng);
      // Handles click events on a map, and adds a new point to the Polyline.
      function addLatLng(event) {
        const path = myComponent.poly.getPath();
        path.push(event.latLng);
        console.log(path, "THIS ", this);

        const arrayOfPoints = [];
        path.b.forEach((onePosition) => {
          arrayOfPoints.push({
            lat: onePosition.lat(),
            lng: onePosition.lng()
          });
        });
        myComponent.arrayOfPoints = arrayOfPoints;
      }

//MAKING PINS -----------------------------------------
      map.addListener('dblclick', (ev) => {
          addPin(ev);
          this.autoZone.run(() => {
            setTimeout(() =>{ this.openPinForm(); }, 800);
          })
      });

      function addPin(event) {
        // gets the id of the route that is being observed
        if (myComponent.routeService.BehSub.getValue()) {
          myComponent.theRouteId = (myComponent.routeService.BehSub.getValue()._id);
          // console.log(myComponent.theRouteId);
        }
        const marker = new google.maps.Marker({
          position: event.latLng,
          map: map,
          animation: google.maps.Animation.DROP,
          icon: '/assets/images/pin.svg',
          draggable: true
        });

        marker.addListener('click', (ev) => {
          map.setZoom(17);
          map.setCenter(marker.getPosition());
          myComponent.autoZone.run(() => {
            setTimeout(() =>{ myComponent.openPinModal(myComponent.newPinID); }, 800);
            console.log(myComponent.newPinID);
          })
        });

        // console.log(marker)
        myComponent.pinLat = marker.position.lat();
        myComponent.pinLng = marker.position.lng();
        };

        // map.addListener('click', this.redrawPath);
  } // END OF ONINIT --------------------------------------------------


// TO OPEN AND CLOSE MODALS
openPinForm (){
  this.pinFormShowing = true;
}
closePinForm(){
  this.pinFormShowing = false;
}

openPinModal(id){
  this.pinWindowShowing = true;
  this.routeService.getOnePin(id)
    .subscribe(res => {
      this.currentPin = res;
    })
}
closePinModal(){
  this.pinWindowShowing = false;
  this.currentPin = "";
}

// SAVE THE PATH --------------------------------------------
  savePath(){
    // console.log('called', this.arrayOfPoints);
    this.routeService.savePathToRoute(this.arrayOfPoints)
      .then(res => {
        console.log(res);
      })
  }

// DELETE THE PATH --------------------------------------
  deletePath(){
    this.routeService.deletePathFromRoute()
      .then(res => {
        console.log(res);
      })
  }

// REDRAW THE ROUTE PATH  -------------------------------
   redrawPath(arrayOfPoints) {
      let savedPath = [];
      arrayOfPoints.forEach((onePair)=>{
        savedPath.push(new google.maps.LatLng(onePair.lat, onePair.lng));
      })
      this.poly.setPath(savedPath);
    }

  // SAVE THE WHOLE NEW PIN ---------------------------------------------
  saveThePinAndPath () {
    this.routeService.newPin(
      this.theRouteId,
      this.newPinName,
      this.newPinDeets,
      this.newPinDuration,
      this.pinLat,
      this.pinLng
    )
    .subscribe(newPinFromApi => {
      this.newPinID = newPinFromApi._id;
      console.log(this.newPinID);
      this.closePinForm();
      this.savePath();
      this.router.navigate(["/"+ this.theRouteId]);
      this.newPinName = "";
      this.newPinDeets = "";
      this.newPinDuration = "";
      this.pinLat = "";
      this.pinLng = "";
    })
  }

// REDROP ALL THE PINS --------------------------------

// Using service to bring in the array of pins:
populatePinArray(){
  this.routeService.getAllPins(this.theRouteId)
    .then((res)=>{
      this.allThePins = res
    })
}

addMarker(lat, lng){
  var marker2 = new google.maps.Marker({
    position : new google.maps.LatLng(lat,lng),
    map: this.map,
    animation: google.maps.Animation.DROP
  });
}

dropAllPins() {
  this.populatePinArray();
  this.allThePins.forEach((onePinObject, index)=>{
    setTimeout(function() {
      this.addMarker(onePinObject.lat, onePinObject.lat);
    }, index * 200);
  })
}

// google.maps.event.addDomListener(window, "load", intialize);


// lOGOUT BUTTON ---------------------------------------
    logMeOut() {
      this.authService.logout()
         .then(()=>{
           this.router.navigate(['/']);
         })
         .catch(()=>{
           this.logoutError = 'Log out did not work';
           console.log(this.logoutError)
         });
    }


  } // END OF export class AppComponent implements OnInit
