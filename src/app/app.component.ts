import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataShareService } from './services/data-share-service';
import { ApiServiceService } from './api-service.service';
//import { Geolocation } from '@ionic-native/geolocation';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{

  public logged: boolean = true
  get userMail(): String { return sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")).email : null}

  constructor(private dataShareService: DataShareService, private logoutS: ApiServiceService, private router: Router) {}

  ngOnInit(){
    this.dataShareService.isUserLoggedIn.subscribe(value => {
      this.logged = value;
    });
    
  }

  logout = async () => {
    try {
      await this.logoutS.logout();
      sessionStorage.removeItem("user");
      this.logged = false
      this.router.navigate([''])
    } catch (error) {
      console.log(error)
    }
  }
}
