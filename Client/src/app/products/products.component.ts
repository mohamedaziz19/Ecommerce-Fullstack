import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {

  isLoginPage: boolean = false;
  isSignupPage: boolean = false;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private cartService: CartService
  ) {
    this.router.events.subscribe(() => {
      const currentRouter = this.router.url;
      this.isLoginPage = currentRouter.includes('/login');
      this.isSignupPage = currentRouter.includes('/signup');
    });
  }

  products: any[] = [];
  menProducts: any[] = [];
  womenProducts: any[] = [];
  childrenProducts: any[] = [];

  ngOnInit(): void {
    this.fetchProducts();
  }


  fetchProducts() {
    this.apiService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
        console.log('Products fetched successfully:', data);


        this.menProducts = this.products.filter(
          (product) => product.category === 'Men'
        );
        this.womenProducts = this.products.filter(
          (product) => product.category === 'Women'
        );
        this.childrenProducts = this.products.filter(
          (product) => product.category === 'Children'
        );
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      },
    });
  }

  slideConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    pauseOnHover: true,
    infinite: true,
    speed: 500,
    accessibility: false,
  };

  selectedProduct: any = null;
  
  addToCart(product: any) {
    this.cartService.addToCart(product);
  }
  viewDetails(product: any): void {
    this.selectedProduct = product;
  }

  closeModal(): void {
    this.selectedProduct = null;
  }
}
