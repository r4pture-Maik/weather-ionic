import { Component, OnInit } from '@angular/core';
import {
  City,
  CurrentRes,
  ForecastRes,
  Forecast,
  mappedForecast,
} from 'src/app/interfaces/forecast';
import { countryCodes } from '../../../assets/countryCodes';
import { CurrentService } from '../../services/current.service';
import { ForecastService } from '../../services/forecast.service';
import { ApiServiceService } from '../../api-service.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.page.html',
  styleUrls: ['./search-page.page.scss'],
})
export class SearchPagePage implements OnInit {
  value: string;
  searchChoice: string;
  country: string;
  lat: number;
  long: number;
  isCurrent: boolean;
  tab: string;
  tempIndex: string;
  countryCodes;

  researchRes: CurrentRes | ForecastRes;

  constructor(
    private apiCaller: ApiServiceService,
    private currentService: CurrentService,
    private forecastService: ForecastService
  ) {}

  ngOnInit() {
    this.countryCodes = countryCodes
    switch (JSON.parse(sessionStorage.getItem("user")).unit) {
      case 'metric':
        this.tempIndex = "C"
        break;
      case 'standard':
        this.tempIndex = "K"
        break;
      case 'imperial':
        this.tempIndex = "F"
        break;
    }
  }

  ionViewWillEnter(){
    this.apiCaller.isLogged()
  }

  chooseCall = (isCurrent: boolean, byWhat: string) => {
    switch (byWhat) {
      case 'city':
        return isCurrent
          ? this.currentService.currentCityName
          : this.forecastService.forecastCityName
      case 'cityid':
        return isCurrent
          ? this.currentService.currentCityId
          : this.forecastService.forecastCityId
      case 'zipcode':
        return isCurrent
          ? this.currentService.currentZipCode
          : this.forecastService.forecastZipCode
      case 'coordinates':
        return isCurrent
          ? this.currentService.currentCoordinates
          : this.forecastService.forecastCoordinates
    }
  };

  caller = async (): Promise<void> => {
    this.researchRes = await this.chooseCall(this.isCurrent, this.searchChoice)(
      Number(this.value),
      this.lat,
      this.value,
      JSON.parse(sessionStorage.getItem("user")).country,
      this.value,
      this.value,
      JSON.parse(sessionStorage.getItem("user")).unit
    );
  };

  changeTab = (tabValue) => {
    if(tabValue === null) this.researchRes = null
    this.tab = tabValue;
  }

  instanceOfForecast = (object: any): object is Forecast => 'temp' in object;

  //Forecast functions
  get mappedForecast(): mappedForecast {
    if (!this.isCurrent || this.isCurrent !== undefined)
      return (
        !this.instanceOfForecast(this.researchRes?.forecast) &&
        this.researchRes?.forecast.reduce((acc, value) => {
          const date = value.time.split(' ', 1)[0];
          return {
            ...acc,
            [date]: [...(acc[date] ? acc[date] : []), value],
          };
        }, {})
      );
  }

  get grouppedForecast(): string[] {
    return this.mappedForecast ? Object.keys(this.mappedForecast) : [];
  }

  get city(): City {
    return this.researchRes?.city;
  }
}
