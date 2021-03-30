import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { NavbarRoutingModule } from './navbar-routing.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NavbarRoutingModule
  ]
})
export class NavbarModule { }
