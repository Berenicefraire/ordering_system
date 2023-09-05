import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private readonly api_url = 'http://localhost:3000';
  private readonly api_version = '/pedidos/v1';

  constructor(private http: HttpClient) {}

  saveFormData(order: any): Observable<any> {
    return this.http.post(`${this.api_url}${this.api_version}/saveOrder`,order);
  }

}
