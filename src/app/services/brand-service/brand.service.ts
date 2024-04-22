import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";

const BASIC_URL = environment["BASIC_URL"]

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http: HttpClient) { }

  getAllBrands(): Observable<any[]> {
    return this.http.get<any[]>(`${BASIC_URL}api/auth/brands`);
  }

  getBrandById(id: number): Observable<any> {
    return this.http.get<any>(`${BASIC_URL}api/auth/brands/${id}`);
  }

  createBrand(brand: any): Observable<any> {
    return this.http.post<any>(`${BASIC_URL}api/auth/brands`, brand);
  }

  updateBrand(id: number, brand: any): Observable<any> {
    return this.http.put<any>(`${BASIC_URL}api/auth/brands/${id}`, brand);
  }

  deleteBrand(id: number): Observable<any> {
    return this.http.delete<any>(`${BASIC_URL}api/auth/brands/${id}`);
  }

  searchBrands(keyword: string): Observable<any[]> {
    return this.http.get<any[]>(`${BASIC_URL}api/auth/brands/search?keyword=${keyword}`);
  }
}