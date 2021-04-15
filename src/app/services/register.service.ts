import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthRes } from '../interfaces/auth-res'
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  
  private uriAuth = ""

  constructor(private client: HttpClient, private router: Router) { }

  register = async (
    name: string, 
    surname: string, 
    username: string, 
    email: string, 
    password: string, 
    country: string, 
    city: string, 
    unit: string
    ): Promise<AuthRes> => await this.client.post(this.uriAuth + "register", { 
      name, 
      surname, 
      username, 
      email, 
      password, 
      country, 
      city, 
      unit }).toPromise() as Promise<AuthRes>;
}
