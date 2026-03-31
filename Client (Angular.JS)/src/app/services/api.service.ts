import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  getProducts() {
    throw new Error('Method not implemented.');
  }
  private url = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken');
    console.log('Token:', token);
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    });
  }

  createOrder(orderData: any): Observable<any> {
    console.log(orderData);
    return this.http.post<any>(`${this.url}/orders`, orderData, {
      headers: this.getAuthHeaders(),
    });
  }

  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/orders`, {
      headers: this.getAuthHeaders(),
    });
  }

  updateOrderStatus(orderId: string, statusData: any): Observable<any> {
    return this.http.put<any>(`${this.url}/orders/${orderId}`, statusData, {
      headers: this.getAuthHeaders(),
    });
  }

  deleteOrder(orderId: string): Observable<any> {
    return this.http.delete<any>(`${this.url}/orders/${orderId}`, {
      headers: this.getAuthHeaders(),
    });
  }

  signup(userData: any): Observable<any> {
    return this.http.post<any>(`${this.url}/user`, userData);
  }

  login(userData: any): Observable<any> {
    return this.http.post<any>(`${this.url}/user/login`, userData).pipe(
      tap((res) => {
        localStorage.setItem('accessToken', res.accessToken);
      })
    );
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.url}/user`);
  }

  updateUserRole(userId: string, role: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.patch<any>(
      `${this.url}/user/${userId}`,
      { role },
      { headers }
    );
  }
  searchProducts(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/products?search=${query}`);
  }

  getAllProducts(): Observable<any> {
    return this.http.get<any>(`${this.url}/products`);
  }

  getProductById(productId: string) {
    return this.http.get<any>(`${this.url}/products/${productId}`);
  }

  updateProduct(productId: string, productData: any): Observable<any> {
    return this.http.put<any>(`${this.url}/products/${productId}`, productData);
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete<any>(`${this.url}/products/${productId}`);
  }

  addProduct(formData: FormData) {
    return this.http.post(`${this.url}/products`, formData); 
  }

  addToCart(cartData: any): Observable<any> {
    return this.http.post<any>(`${this.url}/cart`, cartData);
  }
}
