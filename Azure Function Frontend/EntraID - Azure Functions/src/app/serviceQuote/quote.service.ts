import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TokenService } from '../token/token.service';
import { catchError, Observable, switchMap } from 'rxjs';
import { Quote } from '../interfaces/quote';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  private url = `${environment.baseUrl}/api/quotes`; // Your API endpoint

  constructor(
    private http: HttpClient, 
    private tokenService: TokenService
  ) {}

  // CREATE: Adds a new quote
  createQuote(quote: Quote): Observable<Quote> {
    return this.tokenService.getAccessToken().pipe(
      switchMap((token) => {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Include token in request header
          }),
        };

        return this.http.post<Quote>(this.url, quote, httpOptions); // Send POST request to create quote
      }),
      catchError((error) => {
        console.error('Create quote request failed:', error);
        throw error;
      })
    );
  }

  // READ: Gets all quotes
  getAllQuotes(): Observable<Quote[]> {
    return this.tokenService.getAccessToken().pipe(
      switchMap((token) => {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Include token in request header
          }),
        };

        return this.http.get<Quote[]>(this.url, httpOptions); // Send GET request to fetch all quotes
      }),
      catchError((error) => {
        console.error('Get all quotes request failed:', error);
        throw error;
      })
    );
  }

  // READ: Gets a quote by ID
  getQuoteById(id: number): Observable<Quote> {
    return this.tokenService.getAccessToken().pipe(
      switchMap((token) => {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Include token in request header
          }),
        };

        return this.http.get<Quote>(`${this.url}/${id}`, httpOptions); // Send GET request to fetch quote by ID
      }),
      catchError((error) => {
        console.error('Get quote by ID request failed:', error);
        throw error;
      })
    );
  }

  // UPDATE: Updates an existing quote
  updateQuote(id: number, quote: Quote): Observable<Quote> {
    return this.tokenService.getAccessToken().pipe(
      switchMap((token) => {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Include token in request header
          }),
        };

        return this.http.put<Quote>(`${this.url}/${id}`, quote, httpOptions); // Send PUT request to update quote
      }),
      catchError((error) => {
        console.error('Update quote request failed:', error);
        throw error;
      })
    );
  }
  

  // DELETE: Deletes a quote by ID
  deleteQuote(id: number): Observable<void> {
    return this.tokenService.getAccessToken().pipe(
      switchMap((token) => {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Include token in request header
          }),
        };

        return this.http.delete<void>(`${this.url}/${id}`, httpOptions); // Send DELETE request to remove quote
      }),
      catchError((error) => {
        console.error('Delete quote request failed:', error);
        throw error;
      })
    );
  }
}