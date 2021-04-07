import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import { LoginService } from '../../services/login.service';
import { countryCodes } from '../../../assets/countryCodes';
import { DataShareService } from 'src/app/services/data-share-service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [RegisterService],
})
export class RegisterComponent implements OnInit {
  public myForm: FormGroup;
  public name: string
  public surname: string
  public username: string
  public email: string
  public password: string
  public country: string
  public city: string
  public unit: string
  public metric: string
  public alreadyExist: boolean = false
  countryCodes

  units = {'metric': 'Celsius', 
  'imperial': 'Farenheit', 
  'standard': 'Kelvin'}

  constructor(private fc: FormBuilder, private registerService: RegisterService, 
              private loginService: LoginService, private router: Router, private dataShareService: DataShareService) { }

  ngOnInit(): void {
    this.countryCodes = countryCodes
    //this.createForm()
  }

  // createForm() {
  //   this.myForm = this.fc.group({
  //     name: ['', Validators.required],
  //     surname: ['', Validators.required],
  //     username: ['', Validators.required],
  //     email: ['', Validators.required],
  //     password: ['', Validators.required],
  //     city: ['', Validators.required],
  //     country: ['', Validators.required],
  //     unit: ['', Validators.required],
  //   })
  // }

  portChange({value:{ value }}) {
    this.country = value
    console.log('Value:',  value);
  }

  formRegister = async () => {
     try {
       console.log(this.country)
      await this.registerService.register(this.name,
        this.surname,
        this.username,
        this.email,
        this.password,
        this.country,
        this.city,
        this.unit)
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
      this.router.navigate([''])
    } catch (error) {
      alert(error.error.Error)
    }
  }



}
