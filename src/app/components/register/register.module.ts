import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component'
import { RegisterRoutingModule } from './register-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IonicSelectableModule } from 'ionic-selectable';


@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule, 
    FormsModule, 
    IonicModule, 
    RegisterRoutingModule, 
    ReactiveFormsModule, 
    IonicSelectableModule
  ]
})
export class RegisterModule { }
