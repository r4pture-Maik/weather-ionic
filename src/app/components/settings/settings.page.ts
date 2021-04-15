import { Component, OnInit, ViewChild  } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { countryCodes } from '../../../assets/countryCodes';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  countryCodes
  units: Object

  unit: string
  country: string

  countryFilter: string[]
  searchCountry: string = ""
  constructor() { }

  ngOnInit() {
    this.countryCodes = countryCodes
    this.units = {
      'metric': 'Celsius', 
      'imperial': 'Farenheit', 
      'standard': 'Kelvin'
    }
  }
  

  ionViewWillEnter(){
    this.unit = localStorage.getItem('unit')
    this.country = localStorage.getItem('country')
  }
  ionViewWillLeave(){
    localStorage.setItem("unit",this.unit)
    localStorage.setItem("country",this.country)
    console.log(localStorage.getItem('unit'))
    console.log(localStorage.getItem('country'))
  }
  filterCountry(){
    if(this.searchCountry){
      this.countryFilter = Object.keys(this.countryCodes).filter((key)=>{
        if(RegExp(`^${this.searchCountry.toUpperCase()}`).test(key)){
          return key
        }
      }).splice(0,3)
    }
  }

  selectedCountry(item){
    this.countryFilter = undefined
    this.searchCountry = null
    this.country = this.countryCodes[item]
    this.countryInfo
  }

  get countryInfo(): String {return this.country ? "Selected "+this.country: "Insert country name"}
    

  resetSettings(){
    localStorage.removeItem("unit")
    localStorage.removeItem("country")
    this.unit = undefined
    this.country = undefined
  }
}
