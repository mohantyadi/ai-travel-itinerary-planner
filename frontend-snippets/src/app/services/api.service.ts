import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}
  generateItinerary(data: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/itinerary/generate`, data);
  }
}
