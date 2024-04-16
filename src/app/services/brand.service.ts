import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASIC_URL = 'http://localhost:8090/';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http: HttpClient) { }

  getAllBrands(): Observable<any[]> {
    return this.http.get<any[]>(`${BASIC_URL}api/brands`);
  }

  getBrandById(id: number): Observable<any> {
    return this.http.get<any>(`${BASIC_URL}api/brands/${id}`);
  }

  createBrand(brand: any): Observable<any> {
    return this.http.post<any>(`${BASIC_URL}api/brands`, brand);
  }

  updateBrand(id: number, brand: any): Observable<any> {
    return this.http.put<any>(`${BASIC_URL}api/brands/${id}`, brand);
  }

  deleteBrand(id: number): Observable<any> {
    return this.http.delete<any>(`${BASIC_URL}api/brands/${id}`);
  }

  searchBrands(keyword: string): Observable<any[]> {
    return this.http.get<any[]>(`${BASIC_URL}api/brands/search?keyword=${keyword}`);
  }
}
