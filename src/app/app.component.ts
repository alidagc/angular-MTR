import { Component, OnInit, Inject } from '@angular/core';
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

  currentUser: any;
  logoutError: string;
  poly: any;
  currentRouteId : any;
  arrayOfPoints: Array<any>;
  isLoggedIn: boolean;
  routerIsShowing: boolean = true;
  map: any;
  blah: string;

  constructor(
    private authService : AuthServiceService,
    private routeService : MyTravelRoutesServiceService,
    private router : Router,
    private activatedRoute : ActivatedRoute
  ) { }

    ngOnInit() {
  this.checkLogin();
  this.renderMap();
      // this.activatedRoute.params.subscribe((params: Params) => {
      //   let routeId = params['routeId'];
      //   console.log(routeId);
      // });

      const myComponent = this;

      // if (this.routeService.BehSub.getValue()) {
      //   console.log(this.routeService.BehSub.getValue()._id);
      // }

      this.routeService.BehSub.subscribe(singleRoute => {
        if (singleRoute) {
          this.redrawPath(singleRoute.path);
        }
      })




// MAKING PATHS -----------------------------------------
      this.poly = new google.maps.Polyline({
          strokeColor: '#FFB157',
          strokeOpacity: 1.0,
          strokeWeight: 3,
          draggable: true,
          editable: true
        });
        this.poly.setMap(this.map);

      this.map.addListener('rightclick', addLatLng);
      // Handles click events on a map, and adds a new point to the Polyline.
      function addLatLng(event) {
        const path = myComponent.poly.getPath();
        path.push(event.latLng);
        console.log(path, "THIS ", this);

        // on save route button click
        const arrayOfPoints = [];
        path.b.forEach((onePosition) => {
          arrayOfPoints.push({
            lat: onePosition.lat(),
            lng: onePosition.lng()
          });
        });
        myComponent.arrayOfPoints = arrayOfPoints;
          myComponent.madeUpFunction();
      }

//MAKING PINS -----------------------------------------
      this.map.addListener('dblclick', this.addPin);

    } // END OF ONINIT

  addPin(event) {
      if (this.routeService.BehSub.getValue()) {
        console.log(this.routeService.BehSub.getValue()._id);

      }
      this.routerIsShowing = false;
      console.log(this.routerIsShowing)
      const marker = new google.maps.Marker({
        position: event.latLng,
        map: this.map,
        animation: google.maps.Animation.DROP,
        icon: '/assets/images/pin.svg',
        draggable: true
      });
      console.log(marker)

      const pin = {
        lat: marker.position.lat(),
        lng: marker.position.lng()
      };
      console.log(pin);
      this.madeUpFunction();
    }


checkLogin(){
  this.authService.checklogin()
  .then((resultFromApi)=>{
    this.currentUser = resultFromApi;
    this.router.navigate(['/']);
    this.isLoggedIn = true;
  })
  .catch((err)=>{
    this.isLoggedIn = false;
  });
}



// SAVE THE WHOLE PIN --------------------------------------------
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

    renderMap(){
    const myMap = {
          center: new google.maps.LatLng(40.729589601719894, -74.00004386901855),
          zoom:15,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
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
          console.log(typeof (new google.maps.Map(document.getElementById("gmap"), myMap)))
          this.map = new google.maps.Map(document.getElementById("gmap"), myMap);
          this.map.setOptions({disableDoubleClickZoom: true });

    }

    madeUpFunction(){
        console.log("We're doing nothing in here at all");
        console.log("except");

        this.blah = "blah";
    }
 }
