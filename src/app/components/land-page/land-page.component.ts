import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../../services/forecast.service';
import { City, ForecastRes, mappedForecast } from 'src/app/interfaces/forecast';

@Component({
  selector: 'app-land-page',
  templateUrl: './land-page.component.html',
  styleUrls: ['./land-page.component.scss'],
})
export class LandPageComponent implements OnInit {

  constructor(private apiCaller:ForecastService) { }

  ngOnInit():void {
    this.getLocation()
  }

  longitude: number
  latitude: number
  forecast: ForecastRes | undefined 
  dayKey: string = ""
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

  getLocation(): void {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          this.longitude = position.coords.longitude;
          this.latitude = position.coords.latitude;
          this.forecast = await this.apiCaller.foreCoordAll(this.longitude, this.latitude, "", "", "", "", "metric")
        });
    } else {
       console.log("No support for geolocation")
    }
  }
  setDayKey(dayKey){
    this.dayKey = dayKey
    console.log(this.mappedForecast['2021-04-03'])
  }
  test(item){
    console.log(item)
  }

  get mappedForecast(): mappedForecast {
    return this.forecast?.forecast.reduce((acc, value) => {
      const date = value.time.split(" ", 1)[0];
      return {
        ...acc,
        [date]: [...(acc[date] ? acc[date] : []), value]
      };
    }, {})
  }
  get grouppedForecast(): string[] {
    return this.mappedForecast ? Object.keys(this.mappedForecast) : []
}
 

  get city(): City {
    return this.forecast?.city
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

}
