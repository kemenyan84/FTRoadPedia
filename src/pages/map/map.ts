import { Component, ViewChild, ElementRef } from '@angular/core'; //viewchild akan hubungkan #map dkt map.html
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation'; //refer dekat https://ionicframework.com/docs/native/geolocation/

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

/*
Nota rujukan : https://developers.google.com/maps/documentation/javascript/examples/directions-simple
*/

//Kena tambah untuk pakai google
declare var google: any;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef; // untuk hubungkan dgn map.html

  map: any; // untuk panggil this.map
  center: any; //untuk dapatkan location
  location: string; //untuk searching route
  coords: string; //untuk origin

  constructor(public geolocation: Geolocation, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');

    //geolocation
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      console.log(resp);
      //display map
      this.initMap(resp.coords);
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  //Masukkan map punya function
  initMap(coords){
    let latitude = coords.latitude;
    let longitude = coords.longitude;
    
    this.center = {
      lat: latitude,
      lng: longitude
    };

    this.coords = latitude + ',' + longitude;

    let latlng = new google.maps.LatLng(latitude, longitude);
    
    let mapOptions = {
      center: latlng,
      zoom: 15,
      mapTypeId: 'roadmap', //https://developers.google.com/maps/documentation/javascript/controls
      //mapTypeId: google.maps.MapTypeId.ROADMAP, //boleh refer https://developers.google.com/maps/
      disableDefaultUI: true //takder zoom in zoom out
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement,mapOptions);
    this.addMarker();
  }

  addMarker(){
    //https://developers.google.com/maps/documentation/javascript/examples/marker-simple
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    })

    let content = '<strong>Your Current Location</strong>';
    let infoWindow = new google.maps.InfoWindow({
      content: content
    })
    
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker); //user click marker baru keluar info your current location
    })
    
  }

  setCenter(){
    //function untuk recenter the map
    this.map.panTo(this.center);
  }

  getDirections(){
    let directionService = new google.maps.DirectionsService;
    let directionDisplay = new google.maps.DirectionsRenderer;

    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 15,
      center: this.map.getCenter(),
      disableDefaultUI: true
    });
   
    //directionDisplay.setMap(map);
    directionDisplay.setMap(this.map);
    directionService.route({
      origin: this.center,
      //origin: this.coords,
      destination: this.location,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if(status === 'OK'){
        directionDisplay.setDirections(response);
      }
      else {
        alert('Directions failed: ' + status);
        this.addMarker();
      }
    })
  }

}
