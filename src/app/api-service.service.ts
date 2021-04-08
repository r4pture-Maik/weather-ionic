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

  logout = async () => {
    const { token }= JSON.parse(sessionStorage.getItem("user"));
    const headers = new HttpHeaders().set("token", token);
    await this.client.delete(this.uriAuth + "logout", { headers }).toPromise();
  }

}
