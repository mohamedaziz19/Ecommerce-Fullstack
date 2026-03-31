import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-checkout',
  standalone: false,
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private router: Router,
    private apiService: ApiService
  ) {}

  cartItems: any[] = [];
  totalAmount: number = 0;

  // User info for the checkout form
  user = { email: '', name: '', address: '', phone: '', couponCode: '' };

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((cartItems) => {
      this.cartItems = cartItems;
      console.log('Cart Items:', this.cartItems);
      this.totalAmount = cartItems.reduce(
        (total, item) => total + item.price,
        0
      );
    });
  }

  onSubmit(checkoutForm: NgForm): void {
    if (checkoutForm.invalid) {
      alert('Please fill in all the required fields.');
      return;
    }

    if (
      !this.user.email ||
      !this.user.name ||
      !this.user.address ||
      !this.user.phone
    ) {
      alert('Please provide all required user details.');
      return;
    }

    if (this.cartItems.length === 0) {
      alert(
        'Your cart is empty. Please add items to the cart before proceeding.'
      );
      return;
    }

    const orderData = {
      user: {
        email: this.user.email,
        name: this.user.name,
        address: this.user.address,
        phone: this.user.phone,
        couponCode: this.user.couponCode || '',
      },
      cartItems: this.cartItems.map((item) => ({
        productId: item._id,
        quantity: item.quantity || 1,
      })),
      totalAmount: this.totalAmount,
    };

    console.log('Order Data:', orderData);

    this.apiService.createOrder(orderData).subscribe({
      next: (res) => {
        alert('Order placed successfully!');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error placing order:', err);
        alert('Failed to place order. Please try again.');
      },
    });
  }
}