import { Component, OnInit } from '@angular/core';
import { ForecastService } from '../../services/forecast.service';
import { City, ForecastRes, mappedForecast } from 'src/app/interfaces/forecast';
import { Geolocation} from '@ionic-native/geolocation/ngx' 
@Component({
  selector: 'app-land-page',
  templateUrl: './land-page.component.html',
  styleUrls: ['./land-page.component.scss'],
})
export class LandPageComponent implements OnInit {
  constructor(private apiCaller: ForecastService, private gps: Geolocation) {}

  ngOnInit(): void {
    //this.getLocation();
  }

  tab: string;
  longitude: number;
  latitude: number;
  forecast: ForecastRes | undefined;
  dayKey: string = '';
  displayedColumns: string[] = [
    'date',
    'average',
    'minimum',
    'maximum',
    'pressure',
    'humidity',
    'wind',
    'condition',
    'icon',
  ];

  getLocation(): void {
    alert("soos")
    this.gps.getCurrentPosition(
      {maximumAge: 1000, timeout: 5000,
       enableHighAccuracy: true }
      ).then((resp) => {
            // resp.coords.latitude
            // resp.coords.longitude
            //alert("r succ"+resp.coords.latitude)
            alert(JSON.stringify( resp.coords));
      
            this.latitude=resp.coords.latitude
            this.longitude=resp.coords.longitude
            },er=>{
              //alert("error getting location")
              alert('Can not retrieve Location')
            }).catch((error) => {
            //alert('Error getting location'+JSON.stringify(error));
            alert('Error getting location - '+JSON.stringify(error))
            });
  //   navigator.geolocation.getCurrentPosition(async (position) =>{
  //     this.latitude = position.coords.latitude
  //     alert(position.coords.latitude)
  //     this.longitude = position.coords.longitude
  //     this.forecast = await this.apiCaller.foreCoordAll(
  //     this.longitude,
  //     this.latitude,
  //     '',
  //     '',
  //     '',
  //     '',
  //     'metric'
  //   );
  //  })
    // Geolocation.getCurrentPosition(async ({coords:{longitude, latitude}}) => {
    //     this.longitude = longitude;
    //     this.latitude = latitude;
    //     alert(this.longitude)
    //     this.forecast = await this.apiCaller.foreCoordAll(
    //       this.longitude,
    //       this.latitude, 
    //       '',
    //       '',
    //       '',
    //       '',
    //       'metric'
    //     );
        
    //     this.changeTab(this.grouppedForecast[0]); 
    //   });

    //  else {
    //   console.log('No support for geolocation');
    // }
  }

  changeTab = (tabValue) => this.tab = tabValue;

  get mappedForecast(): mappedForecast {
    return this.forecast?.forecast.reduce((acc, value) => {
      const date = value.time.split(' ', 1)[0];
      return {
        ...acc,
        [date]: [...(acc[date] ? acc[date] : []), value],
      };
    }, {});
  }
  
  get grouppedForecast(): string[] {
    return this.mappedForecast ? Object.keys(this.mappedForecast) : [];
  }

  get city(): City {
    return this.forecast?.city;
  }
}
