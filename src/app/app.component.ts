import { Component, EventEmitter, Input, Output, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { DataShareService } from './services/data-share-service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{

  //@Input() loggedApp = new EventEmitter<String>()
  //@Output() logged = new EventEmitter<string>() 
  //@ViewChild(RouterLoginModule) child;
  public logged: boolean = true
  // public appPages = [
  //   { title: 'Login', url: '/login', icon: 'log-in' },
  //   { title: 'Register', url: '/register', icon: 'body' },
  //   { title: 'Logout', url: '/register', icon: 'log-out' },
  //   { title: 'Search', url: '/my-weather', icon: 'search' },
  // ];

  constructor(private dataShareService: DataShareService) {}

  ngOnInit(){
    //Forse si potrebbe fare una richiesta al server?
    this.dataShareService.isUserLoggedIn.subscribe(value => {
      this.logged = value;
    });
  }

  // ngAfterViewInit(){
  //   console.log(this.child.message)
  //   this.message = this.child.message
  //   console.log(this.message)
  // }

  // checkLogin($event){
  //   this.message=$event
  // }

}
