import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { ApiServiceService } from 'src/app/api-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ApiServiceService]
})
export class LoginComponent implements OnInit {

  public email: string;
  public password: string;
  @Output() logged = new EventEmitter<boolean>()

  constructor(private apiCaller:ApiServiceService) { }

  ngOnInit() {}

  formLogin = async () => {
    try{
      // const res = await this.apiCaller.login(this.email, this.password)
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
      //this.dataShareService.isUserLoggedIn.next(true);
      console.log("Sono dentro login")
      this.logged.emit(true)
      //this.router.navigate(['/'])
    } catch(error) {
      console.log(error)
      alert(error.error.error)
    }}

}
