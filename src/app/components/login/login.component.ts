import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
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
  @Output() logged = new EventEmitter<String>()

  constructor(private loginService:LoginService, private dataShareService: DataShareService) { }

  ngOnInit() {}

  formLogin = async () => {
    try{
      // const res = await this.loginService.login(this.email, this.password)
      // sessionStorage.setItem("user", JSON.stringify(
      //     { 
      //       email: this.email, 
      //       token: res.token,
      //       city: res.city,
      //       country: res.country,
      //       unit: res.unit
      //     }
      //   )
      // )
      this.dataShareService.isUserLoggedIn.next(true);
      //PARTE EMITTER NON FUNZIONA 
      // this.message = "Oloregast"
      // console.log(this.message)
      // console.log("Sono dentro login")
      // this.logged.emit("Logged")

      //this.router.navigate(['/'])
    } catch(error) {
      console.log(error)
      alert(error.error.error)
    }}

}
