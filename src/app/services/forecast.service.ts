import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ForecastRes } from '../interfaces/forecast'
import { Router } from '@angular/router';
import { Unit } from 'openweathermap-ts/dist/types/';
import OpenWeatherMap from 'openweathermap-ts';
import * as x from '../../assets/token'
@Injectable({
  providedIn: 'root'
})
export class ForecastService {
  
  private weather = new OpenWeatherMap(x);

  constructor(private client: HttpClient, private router: Router) { 
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
