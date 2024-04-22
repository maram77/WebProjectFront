import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subscriber } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/modals/product';
import { MatSnackBar } from '@angular/material';
import { map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { environment } from "src/environments/environment";

const BASIC_URL = environment["BASIC_URL"]
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
    public getBanners() {
      return this.banners();
    }

  
  public getProducts(): Observable<Product[]> {
    return this.http.get<any[]>(`${BASIC_URL}api/auth/products`).pipe(
      map(response => {
        if (Array.isArray(response)) {
          return response as Product[]; 
        } else {
          throw new Error('Invalid response format or missing products');
        }
      }),
    );
  }


  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${BASIC_URL}api/auth/products`).pipe(
      tap(products => console.log('Products:', products))
    );
  }

  public getAll(): Observable<Product[]> {
    return this.http.get<any[]>(`${BASIC_URL}api/auth/products`).pipe(
      tap(products => console.log('Products:', products)),
      map(response => {
        if (Array.isArray(response)) {
          return response.map(product => ({
            productReference: product.productReference,
            name: product.name,
            description: product.description,
            image: product.image,
            brand: product.brand,
            category: product.category,
            color: product.color,
            price: product.price,
            quantity: product.quantity
          }));
        } else {
          throw new Error('Invalid response format or missing products');
        }
      })
    );
  }


  getProductByReference(productReference: string): Observable<Product> {
    return this.http.get<Product>(`${BASIC_URL}api/auth/products/${productReference}`);
  }

  createProduct(formData: FormData): Observable<Product> {
    const url = `${BASIC_URL}api/auth/products/add`;
    return this.http.post<Product>(url, formData);
  }

  updateProduct(productReference: string, formData: FormData): Observable<Product> {
    const url = `${BASIC_URL}api/auth/products/update/${productReference}`;
    return this.http.put<Product>(url, formData);
  }
  deleteProduct(productReference: string): Observable<void> {
    return this.http.delete<void>(`${BASIC_URL}api/auth/products/delete/${productReference}`);
  }
  

  getCategoryByProductReference(productReference: string): Observable<any> {
    return this.http.get<any>(`${BASIC_URL}api/auth/products/${productReference}/category`);
  }
  getBrandByProductReference(productReference: string): Observable<any> {
    return this.http.get<any>(`${BASIC_URL}api/auth/products/${productReference}/brand`);
  }

  addToCompare(product: Product): Observable<any> {
    return this.http.post<any>(`${BASIC_URL}api/auth/products/compare/add`, product);
  }

  getCompareProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${BASIC_URL}api/auth/products/compare`);
  }

  removeFromCompare(productId: number): Observable<void> {
    return this.http.delete<void>(`${BASIC_URL}api/auth/products/compare/${productId}`);
  }

  getProductsByCategory(categoryName: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${BASIC_URL}api/auth/products/category/${categoryName}`);
  }
  searchProducts(keyword: string): Observable<Product[]> {
    return this.http.get<any[]>(`${BASIC_URL}api/auth/products/search?keyword=${keyword}`).pipe(
      map(response => {
        const products = response;
        return products;
      })
    );
  }

}