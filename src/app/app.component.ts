import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MapPage } from '../pages/map/map'; //tambah
import { PoiPage } from '../pages/poi/poi'; //tambah
import { CameraPage } from '../pages/camera/camera'; //untuk camera
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser'; //tambah

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  @ViewChild(Nav) nav: Nav;

  rootPage: any = PoiPage; //load page@landing page

  pages: Array<{title: string, component: any, icon?: string}>; //kena edit: mesti sama dgn line 24 | letak ? icon is optional

  constructor(public iab: InAppBrowser, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, icon: 'home' },
      { title: 'Map', component: MapPage, icon: 'map' },
      { title: 'POI', component: ListPage, icon: 'pin' },
      { title: 'Camera', component: CameraPage, icon: 'camera' }
    ];

  }

  openFB(){
    
    let option: InAppBrowserOptions = {
      location: 'no',
      zoom: 'no'
    }
    const browser = this.iab.create('https://m.facebook.com/FTRoadpedia/', '_self', option);

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
