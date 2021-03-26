import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { ApiServiceService } from 'src/app/api-service.service';
import {  countryCodes} from '../../../assets/countryCodes'




@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [ApiServiceService]
})
export class UserComponent implements OnInit {
  public myForm : FormGroup;

  public name:string
  public surname:string
  public username:string
  public email:string
  public password:string
  public country:string
  public city:string
  public unit:string

  private usernameInfo:string
  private countryInfo:string
  private cityInfo:string
  private unitInfo:string

  countryCodes

  units = { metric: 'Celsius',
  imperial: 'Farenheit',
  standard: 'Kelvin'
  }
  constructor(private apiCaller:ApiServiceService, private fc: FormBuilder) { }

  ngOnInit() {
    this.apiCaller.isLogged();
    this.getUserInfo();
    this.countryCodes = countryCodes;
    this.createForm();
  }

  createForm(){
    this.myForm = this.fc.group({
      username:['', Validators.required ],
      city: ['', Validators.required ],
      country:['', Validators.required ],
      unit:['', Validators.required ],
    })
  }



  getUserInfo = async() =>{
    const userInfos = await this.apiCaller.getUserInfo()
    this.email = userInfos.email
    this.name = userInfos.name
    this.surname = userInfos.surname
    this.usernameInfo = userInfos.username
    this.username = userInfos.username
    this.countryInfo = userInfos.country
    this.country = userInfos.country
    this.cityInfo = userInfos.city
    this.city = userInfos.city
    this.unitInfo = userInfos.unit
    this.unit = userInfos.unit
  }

 

}
