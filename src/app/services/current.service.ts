import { Injectable } from '@angular/core';
import OpenWeatherMap from 'openweathermap-ts';
import { Unit } from 'openweathermap-ts/dist/types/';
import * as x from '../../assets/token'

@Injectable({
  providedIn: 'root'
})
export class CurrentService {

  private weather = new OpenWeatherMap(x);
  constructor() { 
    this.weather.setUnits(localStorage.getItem('unit') as Unit)
  }

   currentCityName = (long: number, lat?: number, zipCode?: number, countryCode?: string, cityId?: number, cityName?: string) => { 
      return this.weather.getCurrentWeatherByCityName({ cityName })
   }

  currentCityId = (long: number, lat?: number, zipCode?: number, countryCode?: string, cityId?: number, cityName?: string) => {
    return this.weather.getCurrentWeatherByCityId(cityId)
  }

  currentZipCode = (long: number, lat?: number, zipCode?: number, countryCode?: string, cityId?: number, cityName?: string) => {
    return this.weather.getCurrentWeatherByZipcode(zipCode)
  }

  currentCoordinates = async (long: number, lat?: number, zipCode?: number, countryCode?: string, cityId?: number, cityName?: string) => {
    return this.weather.getCurrentWeatherByGeoCoordinates(lat,long)
  }
 }
