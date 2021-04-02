import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private client: HttpClient) { }

  private uriAuth = "http://localhost:3001/auth/"

  logout = async () => {
    const { token }= JSON.parse(sessionStorage.getItem("user"));
    const headers = new HttpHeaders().set("token", token);
    await this.client.delete(this.uriAuth + "logout", { headers }).toPromise();
  }
  
}
