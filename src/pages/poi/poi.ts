import { Component, ViewChild, ElementRef } from '@angular/core'; //tambah 
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation'; //refer dekat https://ionicframework.com/docs/native/geolocation/

/**
 * Generated class for the PoiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//Kena tambah untuk pakai google
declare var google: any;

 @Component({
  selector: 'page-poi',
  templateUrl: 'poi.html',
})
export class PoiPage {

  @ViewChild('map') mapElement: ElementRef; // untuk hubungkan dgn map.html
  
  map: any; // untuk panggil this.map

  constructor(public geolocation: Geolocation, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    
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

  initMap(coords){
    let latitude = coords.latitude;
    let longitude = coords.longitude;

    let latlng = new google.maps.LatLng(latitude, longitude);
    
    let mapOptions = {
      center: latlng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP, //https://developers.google.com/maps/documentation/javascript/controls
      //mapTypeId: google.maps.MapTypeId.ROADMAP, //boleh refer https://developers.google.com/maps/
      disableDefaultUI: true //takder zoom in zoom out
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement,mapOptions);

    //panggil function searcNearBy()
    this.searchNearby(latlng).then(places => {
      //console.log(JSON.stringify(places)); //untuk debug
      for( let place of places){
        this.addMarker(place, this.map);
      }
    })
  }

  searchNearby(latlng): Promise<any>{
    return new Promise( (resolve, reject) => {
      //let service = new google.maps.places.PlacesService(this.map);
      let service = new google.maps.places.PlacesService(this.map);
      
      //run function
      service.nearbySearch({
        location: latlng,
        radius: 2000,
        type: ['mosque']
      }, (results, status) => {
        if(status === google.maps.places.PlacesServiceStatus.OK){
          resolve(results);
        }
      });
      
    });
  }
  
  //Add marker utk POI
  addMarker(place: any, map: any){
    
    let placelocation = place.geometry.location;
    let marker = new google.maps.Marker({
      map: map,
      position: placelocation,
      icon: 'assets/imgs/masjid.png' //papar icon masjid
    }); 

    //bila user click, papar info pasal POI
    let infoWindow = new google.maps.InfoWindow();
    google.maps.event.addListener(marker, 'click', function() {
      let content: string = '<strong>'+place.name+'</strong></br>';
      content += '<p>'+place.vicinity+'</p></br>';
      //content += "<img src='"+place.photos[0].getUrl+"'>'";
      infoWindow.setContent(content);
      infoWindow.open(map, this);

      setTimeout(function(){ infoWindow.close(); }, 3000);
    })

  }

}
