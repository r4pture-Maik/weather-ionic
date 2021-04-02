import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ForecastRes } from '../interfaces/forecast'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  private uriForecast = "http://localhost:3001/weathers/forecast";

  constructor(private client: HttpClient, private router: Router) { }

  forecastCityName = async (long: string, lat: string, zipCode: string, countryCode: string, cityId: string, cityName: string, unit: string): Promise<ForecastRes> => {
    const { token } = JSON.parse(sessionStorage.getItem("user"))
    const headers = new HttpHeaders().set("unit", unit).set("token", token );
    return await this.client.get(this.uriForecast + `/cities/${cityName}`, { headers }).toPromise() as Promise<ForecastRes>;
  }

  forecastCityId = async (long: string, lat: string, zipCode: string, countryCode: string, cityId: string, cityName: string, unit: string): Promise<ForecastRes> => {
    const { token } = JSON.parse(sessionStorage.getItem("user"))
    const headers = new HttpHeaders().set("unit", unit).set("token", token );
    return await this.client.get(this.uriForecast + `/id/${cityId}`, { headers }).toPromise() as Promise<ForecastRes>;
  }

  forecastZipCode = async (long: string, lat: string, zipCode: string, countryCode: string, cityId: string, cityName: string, unit: string): Promise<ForecastRes> => {
    const { token } = JSON.parse(sessionStorage.getItem("user"))
    const headers = new HttpHeaders().set("unit", unit).set("token", token );
    return await this.client.get(this.uriForecast + `/coutries/${countryCode}/zipcodes/${zipCode}`, { headers }).toPromise() as Promise<ForecastRes>;
  }

  forecastCoordinates = async (long: string, lat: string, zipCode: string, countryCode: string, cityId: string, cityName: string, unit: string): Promise<ForecastRes> => {
    const { token } = JSON.parse(sessionStorage.getItem("user"))
    const headers = new HttpHeaders().set("unit", unit).set("token", token );
    return await this.client.get(this.uriForecast + `/coordinates?long=${long}&lat=${lat}`, { headers }).toPromise() as Promise<ForecastRes>;
  }

  foreCoordAll = async (long: string, lat: string, zipCode: string, countryCode: string, cityId: string, cityName: string, unit: string): Promise<ForecastRes> => {
    const headers = new HttpHeaders().set("unit", unit);
    return await this.client.get(this.uriForecast + `/coordinates/all?long=${long}&lat=${lat}`, { headers }).toPromise() as Promise<ForecastRes>;
  }
}
