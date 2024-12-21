import { Component, OnInit } from '@angular/core';
import { Weather } from '../interfaces/weather';
import { WeatherService } from '../service/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  weather: Weather[] | undefined;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.weatherService.getWeather().subscribe(
      (data: Weather[]) => {
        this.weather = data;
      },
      (error) => {
        console.error('Error fetching weather data:', error);
      }
    );
  }
}
