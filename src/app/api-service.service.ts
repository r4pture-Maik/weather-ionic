import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './interfaces/user';
import { AuthRes} from './interfaces/auth-res'
import { CurrentRes, ForecastRes } from './interfaces/forecast'
import { Router } from '@angular/router';
import { DataShareService } from 'src/app/services/data-share-service';




@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private uriAuth = "http://localhost:3001/auth/"
  private uriWeathers = "http://localhost:3001/weathers/";
  private uriUpdates = "http://localhost:3001/updates";

  constructor(private client: HttpClient, private router: Router, private dataShareService: DataShareService) { }
 
  isLogged = async (): Promise<void> => {
    const token  = (sessionStorage.getItem("user") !== null) ? JSON.parse(sessionStorage.getItem("user")).token : ""
    const headers = new HttpHeaders().set("token", token);
    try{
      const resp = await this.client.get(this.uriAuth + "checkLogin", { headers }).toPromise() as Promise<AuthRes>
      if((await resp).isLogged) this.dataShareService.isUserLoggedIn.next(true)
    }catch(error){
      this.router.navigate(['login'])
    }
  }
  
  login = async (email: string, password: string): Promise<AuthRes> => {
    const headers = new HttpHeaders().set("email", email).set("password", password);
    return await this.client.get(this.uriAuth + "login", { headers }).toPromise() as Promise<AuthRes>;
  }

  getUserInfo =  (): Promise<User> =>{
    const { token }= JSON.parse(sessionStorage.getItem("user"));
    const headers = new HttpHeaders().set("token", token);
    return  this.client.get(this.uriAuth + "userInfo", {headers}).toPromise() as Promise<User>;
  }
  getCountriesList =  (): Promise<JSON> =>  this.client.get(this.uriWeathers + "countries/list").toPromise() as Promise<JSON>

  //UPDATES
  updateUsername = async (username: string) => {
    const body = username
    const { token } = JSON.parse(sessionStorage.getItem("user"))
    const headers = new HttpHeaders().set("token", token );
    await this.client.put(this.uriUpdates + "/username", {headers, body} ).toPromise();
  }

  updateCity = async (city: string) => {
    const { token } = JSON.parse(sessionStorage.getItem("user"))
    const headers = new HttpHeaders().set("token", token );
    await this.client.put(this.uriUpdates + "/city" , city , { headers } ).toPromise
  }

  updateCountry = async (country: string) => {
    const body = country
    const { token } = JSON.parse(sessionStorage.getItem("user"))
    const headers = new HttpHeaders().set("token", token );
    await this.client.put(this.uriUpdates + "/country", {headers, body}).toPromise();
  }

  updateUnit = async (unit: string) => {
    const { token } = JSON.parse(sessionStorage.getItem("user"))
    const headers = new HttpHeaders().set("token", token );
    await this.client.put(this.uriUpdates + "/unit", {headers, unit}).toPromise();
  }
}
