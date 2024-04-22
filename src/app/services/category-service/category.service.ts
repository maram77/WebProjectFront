// category.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";
import { Category } from '../../modals/category';

const BASIC_URL = environment["BASIC_URL"]
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${BASIC_URL}api/auth/categories`);
  }
  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${BASIC_URL}api/auth/categories/${id}`);
  }

  createCategory(category: any): Observable<Category> {
    return this.http.post<Category>(`${BASIC_URL}api/auth/categories`, category);
  }

  updateCategory(id: number, category: any): Observable<Category> {
    return this.http.put<Category>(`${BASIC_URL}api/auth/categories/${id}`, category);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${BASIC_URL}api/auth/categories/${id}`);
  }

  searchCategories(keyword: string): Observable<Category[]> {
    return this.http.get<Category[]>(`${BASIC_URL}api/auth/categories/search?keyword=${keyword}`);
  }
}
