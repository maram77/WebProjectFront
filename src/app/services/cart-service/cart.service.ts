import { Injectable } from '@angular/core';
import { Product } from 'src/app/modals/product.model';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, BehaviorSubject, Subscriber, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Cart } from 'src/app/modals/cart';
import { ProductWithQuantityDto } from 'src/app/modals/ProductWithQuantityDto';
import { environment } from "src/environments/environment";
import { OrderDetail } from '../../modals/orderDetail'; 

const BASIC_URL = environment["BASIC_URL"]


@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartId : number;
  private productsAndQuantitiesSrc= new BehaviorSubject<any>([]);
  currentProductsAndQuantities=this.productsAndQuantitiesSrc.asObservable();

  constructor(private http: HttpClient) { }

  getCartById(cartId: number): Observable<Cart> {
    return this.http.get<Cart>(`${BASIC_URL}api/auth/cart/${cartId}`);
  }

  getAllCarts(): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${BASIC_URL}api/auth/cart/all`);
  }


  addToCart(userId: number, productId: string, quantity: number): Observable<Cart> {
    const url = `${BASIC_URL}api/auth/cart/addWithQuantity?userId=${userId}&productId=${productId}&quantity=${quantity}`;
    //console.log(url,this.http.post<Cart>(url, {}));
    return this.http.post<Cart>(url, {})
  }

  removeProductFromCart(cartId: number, productId: string): Observable<void> {
    const url = `${BASIC_URL}api/auth/cart/${cartId}/product/${productId}`;
    console.log('Delete URL:', url); 
    return this.http.delete<void>(`${BASIC_URL}api/auth/cart/${cartId}/product/${productId}`);
  }

  updateProduct(productReference: string, updatedProduct: any): Observable<any> {
    return this.http.put<any>(`${BASIC_URL}api/auth/cart/${productReference}`, updatedProduct);
  }

  getProductsByCartId(cartId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${BASIC_URL}api/auth/cart/${cartId}/products`);
  }

  updateProductQuantity(cartId: number, productReference: string, quantity: number): Observable<any> {
    const url = `${BASIC_URL}api/auth/cart/${cartId}/product/${productReference}`;
    const params = { quantity: quantity.toString() };
    return this.http.put(url, null, { params });
  }

  getTotalAmount(cartId: number): Observable<number> {
    const url = `${BASIC_URL}api/auth/cart/${cartId}/total`; 
    return this.http.get<number>(url);
  }

  removeFromCompare(productId: string): Observable<void> {
    const url = `api/auth/products/compare/${productId}`;
    return this.http.delete<void>(url);
  }

  
  public getProductsAndQuantities(cartId: number): Observable<ProductWithQuantityDto[]> {
    const url = `${BASIC_URL}api/auth/cart/${cartId}/productsAndQuantities`;
    return this.http.get<ProductWithQuantityDto[]>(url);
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:8090/api/auth/products/all`);
  }

  checkout(userId: number, cartId: number, delivery: any): Observable<any> {
    const url = `http://localhost:8090/api/auth/checkout/process?userId=${userId}&cartId=${cartId}`;
    console.log('Checkout URL:', url); 
    return this.http.post<any>(url, delivery).pipe(
      catchError(error => {
        console.error('An error occurred during checkout:', error);
        return throwError('Failed to complete checkout. Please try again later.');
      })
    );
  }

  changeProductsAndQuantities(array: any){
    this.productsAndQuantitiesSrc.next(array);
   console.log("changeProductsAndQuantities",array);
  }

  getCartByUserId(userId: number): Observable<Cart> {
    const url = `${BASIC_URL}api/auth/cart/user/${userId}`;
    return this.http.get<Cart>(url).pipe(
      tap((cart: Cart) => {
        this.cartId = cart.cartId; 
      })
    );
  }
  getAllDeliveries(): Observable<any[]> {
    return this.http.get<any[]>(`${BASIC_URL}api/auth/deliveries/all`);
  }

  getOrdersByUserId(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${BASIC_URL}api/auth/checkout/orders/${userId}`);
  }

  getAllOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${BASIC_URL}api/auth/checkout/orders`);
  }

  updateOrderDetail(id: number, orderDetail: OrderDetail): Observable<OrderDetail> {
    const url = `${BASIC_URL}api/auth/checkout/${id}`;
    return this.http.put<OrderDetail>(url, orderDetail, this.getHttpOptions()).pipe(
      catchError(this.handleError)
    );
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {

      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }
}