import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingLandModule } from './routing-land.module';
import { LandPageComponent } from './land-page.component';
import { RouterLoginModule } from '../login/router-login.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [LandPageComponent],
  imports: [
    CommonModule,RoutingLandModule,RouterLoginModule,FormsModule,
  ]
})
export class LandPageModule { }
