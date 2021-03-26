import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { RoutingModule } from './routing.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    RoutingModule,
    FormsModule,
    IonicModule,
  ]
})
export class NavbarModule { }
