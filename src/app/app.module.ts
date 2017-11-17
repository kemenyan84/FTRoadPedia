import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation'; //refer dekat https://ionicframework.com/docs/native/geolocation/

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MapPage } from '../pages/map/map'; //untuk MAP lepas $ionic g page map --no-module
import { PoiPage } from '../pages/poi/poi'; //untuk POI lepas $ionic g page POI --no-module
import { CameraPage } from '../pages/camera/camera'; //untuk camera
import { Camera } from '@ionic-native/camera'; // refer https://ionicframework.com/docs/native/camera/
import { InAppBrowser } from '@ionic-native/in-app-browser'; //refer https://ionicframework.com/docs/native/in-app-browser/

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    MapPage, //tambah
    PoiPage, //tambah
    CameraPage //tambah
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    MapPage, //tambah
    PoiPage, //tambah
    CameraPage //tambah
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation, //tambah
    InAppBrowser, //tambah
    Camera, //tambah
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
