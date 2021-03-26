import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MyWeathersComponent } from './my-weathers.component';

const routes: Routes = [
  {
    path: '',
    component: MyWeathersComponent 
  }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class RoutingMyWeathersModule { }
