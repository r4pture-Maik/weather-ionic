import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServiceService } from 'src/app/api-service.service';
import { countryCodes } from '../../../assets/countryCodes'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [ApiServiceService]
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
  public alreadyExist: boolean = false

  countryCodes

  @Output() logged = new EventEmitter<boolean>()
  units = {
    metric: 'Celsius',
    imperial: 'Farenheit',
    standard: 'Kelvin'
  }
  constructor(private fc: FormBuilder, private apicaller: ApiServiceService, private router: Router) { }

  ngOnInit(): void {
    this.countryCodes = countryCodes
    this.createForm()
  }

  createForm() {
    this.myForm = this.fc.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      unit: ['', Validators.required],
    })
  }

  formRegister = async () => {
    try {
      await this.apicaller.register(this.name,
        this.surname,
        this.username,
        this.email,
        this.password,
        this.country,
        this.city,
        this.unit)
      const res = await this.apicaller.login(this.email, this.password)
      sessionStorage.setItem("user", JSON.stringify({ email: this.email, token: res.token }))
      this.logged.emit(true)
      //this.dataShareService.isUserLoggedIn.next(true); ;
      //this.router.navigate(['/'])
    } catch (error) {
      alert(error.error.Error)
    }
  }



}
