import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CurrentRes } from '../interfaces/forecast'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CurrentService {
  
  private uriCurrent = "http://localhost:3001/weathers/current";

  constructor(private client: HttpClient, private router: Router) { }

  currentCityName = async (long: number, lat: number, zipCode: string, countryCode: string, cityId: string, cityName: string, unit: string): Promise<CurrentRes> => {
    const { token } = JSON.parse(sessionStorage.getItem("user"))
    const headers = new HttpHeaders().set("unit", unit).set("token", token );
    return await this.client.get(this.uriCurrent + `/cities/${cityName}`, { headers }).toPromise() as Promise<CurrentRes>;
  }

  currentCityId = async (long: number, lat: number, zipCode: string, countryCode: string, cityId: string, cityName: string, unit: string): Promise<CurrentRes> => {
    const headers = new HttpHeaders().set("unit", unit);
    return await this.client.get(this.uriCurrent + `/id/${cityId}`, { headers,  }).toPromise() as Promise<CurrentRes>;
  }

  currentZipCode = async (long: number, lat: number, zipCode: string, countryCode: string, cityId: string, cityName: string, unit: string): Promise<CurrentRes> => {
    const { token } = JSON.parse(sessionStorage.getItem("user"))
    const headers = new HttpHeaders().set("unit", unit).set("token", token );
    return await this.client.get(this.uriCurrent + `/countries/${countryCode}/zipcodes/${zipCode}`, { headers }).toPromise() as Promise<CurrentRes>;
  }

  currentCoordinates = async (long: number, lat: number, zipCode: string, countryCode: string, cityId: string, cityName: string, unit: string) => {
    const { token } = JSON.parse(sessionStorage.getItem("user"))
    const headers = new HttpHeaders().set("unit", unit).set("token", token );
    return  await this.client.get(this.uriCurrent + `/coordinates?long=${long}&lat=${lat}`, { headers }).toPromise() as Promise<CurrentRes>;
  }
}
