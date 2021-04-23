import { Component } from '@angular/core';
import { CurrentService } from '../../services/current.service';
import { ForecastService } from '../../services/forecast.service';
//import { Geolocation } from '@ionic-native/geolocation/ngx';
import { CurrentResponse, ThreeHourResponse } from 'openweathermap-ts/dist/types';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.page.html',
  styleUrls: ['./search-page.page.scss'],
})
export class SearchPagePage{
  value: string = "Catania";
  searchChoice: string = "city"
  country: string;
  lat: number;
  long: number;
  isCurrent: boolean = false
  tab: string;
  tempIndex: string;
  researchRes: CurrentResponse | ThreeHourResponse;
  constructor(
    private currentService: CurrentService,
    private forecastService: ForecastService
  ) {}
  
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
      this.tab = "2021-04-23"
  };

  changeTab = (tabValue) => {
    console.log(tabValue)
    tabValue === null && (this.researchRes = null);
    this.tab = tabValue;
  }

  instanceOfForecast = (object: any): object is ThreeHourResponse => 'list' in object;

  get placeholderInfo(): String {return this.searchChoice == "coordinates" ? "Longitude" : "Insert city information"}
  
  get mappedForecast(): any {
    if ((!this.isCurrent || this.isCurrent !== undefined) && this.instanceOfForecast(this.researchRes))
      return this.researchRes.list.reduce((acc, {
        main: { temp },
        dt_txt,
        weather: [{ main, icon }],
        wind: { speed }
      }) => {
        const date = dt_txt.split(' ', 1)[0]
        return {
          ...acc,
          [date]: [...(acc[date] ? acc[date] : []), { dt_txt, temp, main, icon, speed }]
        }
      }, [])
  }

  get grouppedForecast(): string[] {
    return this.mappedForecast ? Object.keys(this.mappedForecast) : [];
  }
}


