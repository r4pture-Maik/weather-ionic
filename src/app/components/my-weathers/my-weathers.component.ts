import { Component, OnInit } from '@angular/core';
import { City, CurrentRes, ForecastRes, mappedForecast } from 'src/app/interfaces/forecast';
import { countryCodes } from '../../../assets/countryCodes'
import { CurrentService } from '../../services/current.service';
import { ForecastService } from '../../services/forecast.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-my-weathers',
  templateUrl: './my-weathers.component.html',
  styleUrls: ['./my-weathers.component.scss'],
})
export class MyWeathersComponent implements OnInit {
  value: string;
  searchChoice: string
  country: string
  isCurrent: boolean
  lat: number
  long: number

  currentRes: CurrentRes | ForecastRes
  forecastRes: ForecastRes

  displayedColumns: string[] = [
    "date",
    "average",
    "minimum", 
    "maximum", 
    "pressure",
    "humidity",
    "wind",
    "condition",
    "icon"
  ]

  countryCodes
  constructor(private geolocation: Geolocation, private currentService: CurrentService, private forecastService: ForecastService) { }



  ngOnInit(): void {
    //this.apicaller.isLogged();
    this.countryCodes = countryCodes 
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude
      this.long = resp.coords.longitude
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  chooseCall = (isCurrent: boolean, byWhat: string) => {
      switch (byWhat) {
        case "city": return isCurrent ? 
                      this.currentService.currentCityName : 
                      this.forecastService.forecastCityName;
        case "cityid": return isCurrent ? 
                      this.currentService.currentCityId : 
                      this.forecastService.forecastCityId;
        // case "zipcode": return isCurrent ? 
        //               this.currentService.currentZipCode : 
        //               this.forecastService.forecastZipCode;
        case "coordinates": return isCurrent ? 
                      this.currentService.currentCoordinates : 
                      this.forecastService.forecastCoordinates;
      }
  }

  caller = async (): Promise<void> => {
    this.currentRes = await this.chooseCall(this.isCurrent, this.searchChoice)(this.long, this.lat, "95022", "IT", "pippo", "Mineo", "Metric")
  }
  
  //Forecast functions
  get mappedForecast(): mappedForecast {
    if(!this.isCurrent || this.isCurrent !== undefined)
    return this.forecastRes?.forecast.reduce((acc,value) => {
      const date = value.time.split(" ", 1)[0]
      return {
        ...acc,
        [date]: [...(acc[date] ? acc[date] : []), value]
      }
    }, {} )
  }

  get grouppedForecast(): string[] {
    return this.mappedForecast ? Object.keys(this.mappedForecast) : []
  }

  get city(): City {
    return this.forecastRes?.city
  }

  // async chooseCall(): Promise<void> {
  //   this.apicaller.isLogged()
  //   this.forecastRes = undefined
  //   this.currentRes = undefined
  //   if (this.isCurrent === "current") {
  //     switch (this.searchChoice) {

  //       case "city":
  //         this.currentRes = await chooseCall(isCurrent, "city")(
  //           this.value,
  //           JSON.parse(sessionStorage.getItem("user")).unit ?
  //             JSON.parse(sessionStorage.getItem("user")).unit :
  //             "metric"
  //         )
  //       break;

  //       case "cityid":
  //         this.currentRes = await this.apicaller.currentCityId(
  //           this.value,
  //           JSON.parse(sessionStorage.getItem("user")).unit ?
  //             JSON.parse(sessionStorage.getItem("user")).unit :
  //             "metric"
  //         )
  //       break;

  //       case "zipcode":
  //         this.currentRes = await this.apicaller.currentZipCode(
  //           this.value,
  //           this.country,
  //           JSON.parse(sessionStorage.getItem("user")).unit ?
  //             JSON.parse(sessionStorage.getItem("user")).unit :
  //             "metric"
  //         )
  //       break;

  //       case "coordinates":
  //         const coord = this.value.split(",")
  //         console.log(coord[0]);
  //         console.log(coord[1]);
  //         this.currentRes = await this.apicaller.currentCoordinates(
  //           coord[0],
  //           coord[1],
  //           JSON.parse(sessionStorage.getItem("user")).unit ?
  //             JSON.parse(sessionStorage.getItem("user")).unit :
  //             "metric"
  //         )
  //       break;

  //       default:
  //       break;   
  //     }
  //   } else {
  //     switch (this.searchChoice) {
  //       case "city":
  //         this.forecastRes = await this.apicaller.forecastCityName(
  //           this.value,
  //           JSON.parse(sessionStorage.getItem("user")).unit ?
  //             JSON.parse(sessionStorage.getItem("user")).unit :
  //             "metric"
  //         )
  //         break;
  //       case "cityid":
  //         this.forecastRes = await this.apicaller.forecastCityId(
  //           this.value,
  //           JSON.parse(sessionStorage.getItem("user")).unit ?
  //             JSON.parse(sessionStorage.getItem("user")).unit :
  //             "metric"
  //         )
  //         break;
  //       case "zipcode":
  //         this.forecastRes = await this.apicaller.forecastZipCode(
  //           this.value,
  //           this.country,
  //           JSON.parse(sessionStorage.getItem("user")).unit ?
  //             JSON.parse(sessionStorage.getItem("user")).unit :
  //             "metric"
  //         )
  //         break;
  //       case "coordinates":
  //         const coord = this.value.split(",")
  //         this.forecastRes = await this.apicaller.forecastCoordinates(
  //           coord[0],
  //           coord[1],
  //           JSON.parse(sessionStorage.getItem("user")).unit ?
  //             JSON.parse(sessionStorage.getItem("user")).unit :
  //             "metric"
  //         )
  //         break;
  //       default:
  //         break;
  //     }
  //   }
  // }


  


}
