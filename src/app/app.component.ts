import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataShareService } from './services/data-share-service';
import { LogoutService } from './services/logout.service';
//import { Geolocation } from '@ionic-native/geolocation';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{

  public logged: boolean = true
  public userMail: String = sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")).email : null
  // public appPages = [
  //   { title: 'Login', url: '/login', icon: 'log-in' },
  //   { title: 'Register', url: '/register', icon: 'body' },
  //   { title: 'Logout', url: '/register', icon: 'log-out' },
  //   { title: 'Search', url: '/my-weather', icon: 'search' },
  // ];

  constructor(private dataShareService: DataShareService, private logoutS: LogoutService, private router: Router) {}

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
      this.router.navigate(['/'])
    } catch (error) {
      console.log(error)
    }
  }
}
