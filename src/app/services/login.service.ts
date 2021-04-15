import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthRes } from '../interfaces/auth-res'
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private uriAuth = ""

  constructor(private client: HttpClient, private router: Router) { }

  login = async (email: string, password: string): Promise<AuthRes> => {
    const headers = new HttpHeaders().set("email", email).set("password", password);
    return await this.client.get(this.uriAuth + "login", { headers }).toPromise() as Promise<AuthRes>;
  }
}

