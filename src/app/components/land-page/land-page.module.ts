import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingLandModule } from './routing-land.module';
import { LandPageComponent } from './land-page.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
@NgModule({
  declarations: [LandPageComponent],
  imports: [
    CommonModule, RoutingLandModule, FormsModule, IonicModule
  ]
})
export class LandPageModule { }
