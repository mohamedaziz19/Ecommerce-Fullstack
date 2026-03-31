import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Router, NavigationEnd } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  cartItems: any[] = [];
  cartItemCount: number = 0;
  cartTotal: number = 0;
  isCartOpen: boolean = false;

  isLoginPage: boolean = false;
  isSignupPage: boolean = false;

  searchQuery: string = '';
  searchResults: any[] = [];

  constructor(
    private cartService: CartService,
    private router: Router,
    private apiService: ApiService
  ) {}

  onSearchChange(): void {
    if (this.searchQuery.length > 2) {
      this.apiService.searchProducts(this.searchQuery).subscribe({
        next: (results) => {
          this.searchResults = results.filter((product: any) =>
            product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
        },
        error: (err) => {
          console.error('Error fetching search results:', err);
        },
      });
    } else {
      this.searchResults = [];
    }
  }

  filterProducts(): void {
    if (this.searchQuery.trim().length > 0) {
      this.apiService.searchProducts(this.searchQuery).subscribe((results) => {
        this.searchResults = results.filter((product: any) =>
          product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );

        if (this.searchResults.length === 0) {
          alert('No product found matching your search.');
        }
      });
    } else {
      alert('Please enter a search query.');
    }
  }

  selectProduct(product: any): void {
    this.searchQuery = product.name;
    this.searchResults = [];
    this.apiService.searchProducts(this.searchQuery).subscribe((results) => {
      this.searchResults = results.filter((p: any) => p._id === product._id);
    });
  }

  // Cart
  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((cartItems) => {
      this.cartItems = cartItems;
      this.cartItemCount = cartItems.length;
      this.cartTotal = cartItems.reduce((total, item) => total + item.price, 0);
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentUrl = event.urlAfterRedirects;
        this.isLoginPage = currentUrl.includes('/login');
        this.isSignupPage = currentUrl.includes('/signup');
      }
    });
  }

  // Open/close cart
  openCart(): void {
    this.isCartOpen = true;
  }

  closeCart(): void {
    this.isCartOpen = false;
  }

  removeFromCart(product: any) {
    this.cartService.removeFromCart(product);
  }

  proceedToCheckout(): void {
    this.router.navigate(['/checkout']);
  }
}
