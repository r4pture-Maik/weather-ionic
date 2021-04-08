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

  units = {
    'metric': 'Celsius', 
    'imperial': 'Farenheit', 
    'standard': 'Kelvin'
  }

  constructor(
    private fc: FormBuilder, 
    private registerService: RegisterService, 
    private loginService: LoginService, 
    private router: Router, 
    private dataShareService: DataShareService
  ) { }

  ngOnInit(): void {
    this.countryCodes = countryCodes
    //this.createForm()
  }

  // createForm() {
  //   this.myForm = this.fc.group({
  //     name: ['', [Validators.required, Validators.minLength(2)]],
  //     surname: ['', [Validators.required,Validators.minLength(2)]],
  //     username: ['', Validators.required, Validators.minLength(6)],
  //     email: ['', [Validators.required,, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
  //     password: ['', [Validators.required, Validators.minLength(3), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
  //     city: ['', Validators.required],
  //     country: ['', Validators.required],
  //     unit: ['', Validators.required],
  //   })
  // }

  // get errorForm(){
  //   return this.myForm.controls
  // }

  
  formRegister = async () => {
     try {
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
    } catch ({error:{error: { Error}}}) {
      alert(Error)
    }
  }



}
