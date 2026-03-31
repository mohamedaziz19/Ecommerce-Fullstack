
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private _cartItems = new BehaviorSubject<any[]>([]);
  cartItems$ = this._cartItems.asObservable();

  constructor() {}

 
  addToCart(product: any) {
    const currentItems = this._cartItems.value; 
    this._cartItems.next([...currentItems, product]); 
  }

  
  removeFromCart(product: any) {
    const updatedItems = this._cartItems.value.filter(item => item !== product);
    this._cartItems.next(updatedItems);
  }


  get cartItemCount(): number {
    return this._cartItems.value.length;
  }

  get cartTotal(): number {
    return this._cartItems.value.reduce((total, item) => total + item.price, 0);
  }
}
