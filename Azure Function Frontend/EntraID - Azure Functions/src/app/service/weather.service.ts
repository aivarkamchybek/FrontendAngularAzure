import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { catchError, from, Observable, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Weather } from '../interfaces/weather';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private url = `${environment.baseUrl}/api/weather`;

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  // Method to get weather data
  getWeather(): Observable<Weather[]> {
    return this.tokenService.getAccessToken().pipe( // Use TokenService to get the token
      switchMap((token) => {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Use token in the Authorization header
          }),
        };

        return this.http.get<Weather[]>(this.url, httpOptions); // Fetch weather data
      }),
      catchError((error) => {
        console.error('Weather request failed:', error);
        throw error; // Handle errors from the weather request
      })
    );
  }
}