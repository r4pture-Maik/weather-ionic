import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LandPageComponent } from './land-page.component';

const routes: Routes = [
  {
    path: '',
    component: LandPageComponent
  } 
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class RoutingLandModule { }
