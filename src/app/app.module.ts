import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicSelectableModule } from 'ionic-selectable';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//ComponentsModule
import { HttpClientModule } from '@angular/common/http'
import { NavbarRoutingModule } from './components/navbar/navbar-routing.module';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    IonicSelectableModule,
    ReactiveFormsModule,
    NavbarRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy,  }],
  bootstrap: [AppComponent],

})
export class AppModule {}
