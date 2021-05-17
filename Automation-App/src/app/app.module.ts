import { AddCameraPageModule } from './add-camera/add-camera.module';
import { AddCameraPage } from './add-camera/add-camera.page';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { ComponentsModule } from './components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { VariableManagementService } from './Services/variable-management.service';
import { IdentifyDevicePage } from './add-device/identify-device/identify-device.page';
import { IdentifyDevicePageModule } from './add-device/identify-device/identify-device.module';
import { AddPowerOutletPage } from './add-power-outlet/add-power-outlet.page';
import { AddPowerOutletPageModule } from './add-power-outlet/add-power-outlet.module';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [IdentifyDevicePage, AddPowerOutletPage, AddCameraPage],
  imports: [BrowserModule, HttpClientModule, IonicModule.forRoot(), AppRoutingModule, ComponentsModule, FormsModule, ReactiveFormsModule, ChartsModule, IdentifyDevicePageModule, AddPowerOutletPageModule, AddCameraPageModule],
  providers: [
    VariableManagementService,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
