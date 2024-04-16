import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subscriber } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/modals/product.model';
import { MatSnackBar } from '@angular/material';
import { map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';

const BASE_URL = 'http://localhost:8090/products';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public currency : string = 'USD';
  public catalogMode : boolean = false;

  private _url: string = "assets/data/";
  public url = "assets/data/banners.json";

  constructor(private http: HttpClient) { }
  


  public banners(): Observable<any[]>{
    return this.http.get<any[]>(this.url);
  }


    // Get Banners
    public getBanners() {
      return this.banners();
    }

    // Get Banners
    public getProducts(): Observable<Product[]> {
      return this.http.get<Product[]>(`${BASE_URL}/all`);
    }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${BASE_URL}/all`).pipe(
      tap(products => console.log('Products:', products)) // Log products to console
    );
  }

  getProductByReference(productReference: string): Observable<Product> {
    return this.http.get<Product>(`${BASE_URL}/${productReference}`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(BASE_URL, product);
  }

  updateProduct(productReference: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`${BASE_URL}/${productReference}`, product);
  }

  deleteProduct(productReference: string): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/${productReference}`);
  }

  uploadImage(productReference: string, imageFile: File): Observable<void> {
    const formData = new FormData();
    formData.append('image', imageFile);
    return this.http.post<void>(`${BASE_URL}/${productReference}/images`, formData);
  }

  getProductImageByReference(productReference: string): Observable<any> {
    return this.http.get(`${BASE_URL}/${productReference}/image`, { responseType: 'blob' });
  }
  getCategoryByProductReference(productReference: string): Observable<any> {
    return this.http.get<any>(`${BASE_URL}/${productReference}/category`);
  }

  // Add product to comparison list
  addToCompare(product: Product): Observable<any> {
    return this.http.post<any>(`${BASE_URL}/compare/add`, product);
  }

  getCompareProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${BASE_URL}/compare`);
  }

  removeFromCompare(productId: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/compare/${productId}`);
  }

  getProductsByCategory(categoryName: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${BASE_URL}/category/${categoryName}`);
  }

  getProductQuantity(productReference: string): Observable<number> {
    return this.http.get<number>(`${BASE_URL}/${productReference}/quantity`);
  }

 
      

}
