import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataShareService } from 'src/app/services/data-share-service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  public email: string;
  public password: string;
  public message: string

  constructor(private loginService:LoginService, private dataShareService: DataShareService, private router: Router) { }

  ngOnInit() {}

  formLogin = async () => {
    try{
      const res = await this.loginService.login(this.email, this.password)
      sessionStorage.setItem("user", JSON.stringify(
          { 
            email: this.email, 
            token: res.token,
            city: res.city,
            country: res.country,
            unit: res.unit
          }
        )
      )
      this.dataShareService.isUserLoggedIn.next(true);
      sessionStorage.setItem("user", JSON.stringify({ email: this.email, token: res.token }))
      this.router.navigate(['/my-weather'])
    } catch(error) {
      console.log(error)
      alert(error.error.error)
    }}

}
