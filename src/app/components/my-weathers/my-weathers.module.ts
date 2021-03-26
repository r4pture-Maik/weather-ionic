import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyWeathersComponent } from './my-weathers.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RoutingMyWeathersModule} from '../my-weathers/routing-my-weathers.module';



@NgModule({
  declarations: [MyWeathersComponent],
  imports: [
    CommonModule, FormsModule, IonicModule, RoutingMyWeathersModule, ReactiveFormsModule
  ]
})
export class MyWeathersModule { }
