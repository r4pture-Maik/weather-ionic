import { Injectable } from '@angular/core';
import { Unit } from 'openweathermap-ts/dist/types/';
import OpenWeatherMap from 'openweathermap-ts';
import * as x from '../../assets/token'
@Injectable({
  providedIn: 'root'
})
export class ForecastService {
  
  private weather = new OpenWeatherMap(x);

  constructor() { 
    this.weather.setUnits(localStorage.getItem('unit') as Unit)
  }

  forecastCityName = (long: number, lat?: number, zipCode?: number, countryCode?: string, cityId?: number, cityName?: string) => {
    return this.weather.getThreeHourForecastByCityName({cityName})
  }

  forecastCityId = (long: number, lat?: number, zipCode?: number, countryCode?: string, cityId?: number, cityName?: string) => {
    return this.weather.getThreeHourForecastByCityId(cityId)
  }

  forecastZipCode = (long: number, lat?: number, zipCode?: number, countryCode?: string, cityId?: number, cityName?: string) => {
    return this.weather.getThreeHourForecastByZipcode(zipCode)
  }

  forecastCoordinates = (long: number, lat?: number, zipCode?: number, countryCode?: string, cityId?: number, cityName?: string) => {
    return this.weather.getThreeHourForecastByGeoCoordinates(lat, long)
  }
}
