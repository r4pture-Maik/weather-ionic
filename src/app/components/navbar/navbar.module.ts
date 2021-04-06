import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { NavbarRoutingModule } from './navbar-routing.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NavbarRoutingModule,
    NavbarComponent
  ]
})
export class NavbarModule { }
