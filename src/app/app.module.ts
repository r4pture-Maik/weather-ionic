import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//ComponentsModule


import {HttpClientModule} from '@angular/common/http'
import { ApiServiceService } from './api-service.service';
import { NavbarModule } from './components/navbar/navbar.module';
//import { RegisterModule } from './components/register/register.module';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,ReactiveFormsModule,NavbarModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy,  },ApiServiceService],
  bootstrap: [AppComponent],

})
export class AppModule {}
