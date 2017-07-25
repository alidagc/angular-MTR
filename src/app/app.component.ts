import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from './services/auth-service.service';
import { MyTravelRoutesServiceService } from './services/my-travel-routes-service.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

declare const google: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  logoutError: string;
  poly: any;
  currentRouteId : any;
  arrayOfPoints: Array<any>;

  constructor(
    private authService : AuthServiceService,
    private router : Router,
    private route : ActivatedRoute,
    private routeService : MyTravelRoutesServiceService
  ) { }

    ngOnInit() {
      const myComponent = this;
      this.routeService.route.subscribe(singleRoute => {
        if (singleRoute) {
          this.redrawPath(singleRoute.path);
        }
      })

      const myMap = {
          center: new google.maps.LatLng(40.758896, -73.985130),
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

        // on save route button click
        const arrayOfPoints = [];
        path.b.forEach((onePosition) => {
          arrayOfPoints.push({
            lat: onePosition.lat(),
            lng: onePosition.lng()
          });
        });
        myComponent.arrayOfPoints = arrayOfPoints;
      }

//MAKING PINS (marker + windows)
      map.addListener('dblclick', addPin);

      function addPin(event) {

        const marker = new google.maps.Marker({
          position: event.latLng,
          map: map,
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

        // const infowindow = new google.maps.InfoWindow({
        //   content: '<app-add-new-route></app-add-new-route>'
        // });
        //
        // infowindow.open(map, marker);
        //
        // marker.addListener('click', function() {
        //   infowindow.open(map, marker);
        //   // myComponent.authService.addMarker()
        // });
      }


      // map.addListener('click', redrawPath);


    } // END OF ONINIT

// SAVE PATH --------------------------------------------
savePath(){
  // console.log('called', this.arrayOfPoints);
  this.routeService.savePathToRoute(this.arrayOfPoints)
    .then(res => {
      console.log(res);
    })

}
// REDRAW THE ROUTE PATH  -------------------------------
   redrawPath(arrayOfPoints) {
      let savedPath = [];

      // const samplePolyArray = [
      //   {lat: 40.75161349552274, lng: -73.97403717041016},
      //   {lat: 40.75473441810165, lng: -73.97167682647705},
      //   {lat: 40.750605666315856, lng: -73.9719986915589}
      // ]

      arrayOfPoints.forEach((onePair)=>{
        savedPath.push(new google.maps.LatLng(onePair.lat, onePair.lng));
      })

      this.poly.setPath(savedPath);
    }



// lOGOUT BUTTON ---------------------------------------
    logMeOut() {
      this.authService.logout()
         .then(()=>{
           this.router.navigate(['']);
         })
         .catch(()=>{
           this.logoutError = 'Log out did not work';
         });
    }
 }
