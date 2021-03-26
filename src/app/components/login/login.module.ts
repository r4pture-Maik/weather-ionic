import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterLoginModule } from './router-login.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,RouterLoginModule,FormsModule,
    IonicModule,
  ]
})
export class LoginModule { }
