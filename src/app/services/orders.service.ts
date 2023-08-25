import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private readonly api_url = 'http://localhost:3000';
  private readonly api_version = '/test/v1';

  constructor(private http: HttpClient) {}

  // saveFormData(order: any): Observable<any> {
  //   // En que ruta vas a recibir esa llamada?
  //   // Que le vas a mandar?
  //   return this.http.post(`${this.url}/newOrder`, order);
  // }

  saveFormData(order: any): Observable<any> {
    return this.http.post(`${this.api_url}${this.api_version}/saveOrder`, order);
  }

}
