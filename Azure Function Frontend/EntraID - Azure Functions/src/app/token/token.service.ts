import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { catchError, from, Observable, switchMap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor(private authService: MsalService) {}

  // Method to get the access token
  getAccessToken(): Observable<string> {
    const account = this.authService.instance.getActiveAccount();
    if (account) {
      return from(
        this.authService.instance.acquireTokenSilent({
          scopes: environment.scopeUri,
          account: account,
        })
      ).pipe(
        switchMap((response) => {
          return [response.accessToken]; // Return the access token as an array
        }),
        catchError((error) => {
          console.error('Token acquisition error:', error);
          return throwError('Failed to acquire token'); // Return observable error
        })
      );
    } else {
      return throwError('No active account found');
    }
  }
}