import { Component, EventEmitter, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  @Input() logged = new EventEmitter<String>()
  message = "something"
  public appPages = [
    { title: 'Login', url: '/login', icon: 'log-in' },
    { title: 'Register', url: '/register', icon: 'body' },
    { title: 'Logout', url: '/register', icon: 'log-out' },
    //{ title: 'Search', url: '/folder/Favorites', icon: 'search' },
  ];
  
  constructor() { }

  ngOnInit() {}

  // checkLogin($event){
  //   this.message = $event
  //   alert($event)
  // }
}
