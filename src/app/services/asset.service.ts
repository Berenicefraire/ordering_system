import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssetService {
  private readonly api_url = 'http://localhost:3000';
  private readonly api_version = '/pedidos/v1';
  constructor(private http: HttpClient) { }

  getColors(): Observable<any> {
    return this.http.get(`${this.api_url}${this.api_version}/getColors`);
  }

  getGenders(): Observable<any> {
    return this.http.get(`${this.api_url}${this.api_version}/getGenders`);
  }

  getSizes(): Observable<any> {
    return this.http.get(`${this.api_url}${this.api_version}/getSizes`);
  }
  getTextilType(): Observable<any> {
    return this.http.get(`${this.api_url}${this.api_version}/getTextilType`);
  }
  getOrderPlace(): Observable<any> {
    return this.http.get(`${this.api_url}${this.api_version}/getOrderPlace`);
  }
}
