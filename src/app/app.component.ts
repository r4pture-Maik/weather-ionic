import { Component, EventEmitter, Input } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  @Input() loggedApp = new EventEmitter<boolean>()
  //@Output() logged = new EventEmitter<boolean>() 

  public appPages = [
    { title: 'Login', url: '/login', icon: 'log-in' },
    { title: 'Register', url: '/register', icon: 'body' },
    { title: 'Logout', url: '/register', icon: 'log-out' },
    //{ title: 'Search', url: '/folder/Favorites', icon: 'search' },
  ];

  constructor() {}
  checkLogin(logged: boolean){
    console.log("L'utente è " + logged)
    if(logged){
    console.log("L'utente è " + logged)
    }
  }
}
