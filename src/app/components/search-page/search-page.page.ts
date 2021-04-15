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
import { CurrentResponse, ThreeHourResponse } from 'openweathermap-ts/dist/types';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.page.html',
  styleUrls: ['./search-page.page.scss'],
})
export class SearchPagePage implements OnInit {
  value: string = "Catania";
  searchChoice: string = "city"
  country: string;
  lat: number;
  long: number;
  isCurrent: boolean = false
  tab: string;
  tempIndex: string;
  countryCodes;

  researchRes: CurrentResponse | ThreeHourResponse;
  constructor(
    private apiCaller: ApiServiceService,
    private currentService: CurrentService,
    private forecastService: ForecastService
  ) {}

  ngOnInit() {
    //this.countryCodes = countryCodes
    // switch (JSON.parse(sessionStorage.getItem("user")).unit) {
    //   case 'metric':
    //     this.tempIndex = "C"
    //     break;
    //   case 'standard':
    //     this.tempIndex = "K"
    //     break;
    //   case 'imperial':
    //     this.tempIndex = "F"
    //     break;
    // }
  }

  ionViewWillEnter(){
    //this.apiCaller.isLogged()
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
      Number(this.value),
      localStorage.getItem("user"),
      Number(this.value),
      this.value
      )
    //console.log(this.mappedForecast)
  };

  changeTab = (tabValue) => {
    tabValue === null && (this.researchRes = null);
    this.tab = tabValue;
  }

  instanceOfForecast = (object: any): ThreeHourResponse => 'list' in object ? object : {} ;

  get placeholderInfo(): String {return this.searchChoice == "coordinates" ? "Longitude" : "Insert city information"}
  
  get mappedForecast(): mappedForecast {
    if (!this.isCurrent || this.isCurrent !== undefined)
      return (
        this.instanceOfForecast(this.researchRes).list.reduce((acc, value, index) => {
          //const date = value.time.split(' ', 1)[0];
          // return {
          //   ...acc,
          //   [date]: [...(acc[date] ? acc[date] : []), value],
          // };
          const {
          main:{temp},
          dt_txt,
          weather,
          wind:{speed}
          } = value
          const date = dt_txt.split(' ',1)[0]
          return {
            ...acc,
            [date]: {icon:weather[0].icon, date, main:weather[0].main, temp, speed},
          };
        }, {})
      );
  }

  get grouppedForecast(): string[] {
    console.log(Object.keys(this.mappedForecast))
    return this.mappedForecast ? Object.keys(this.mappedForecast) : [];
  }
}
