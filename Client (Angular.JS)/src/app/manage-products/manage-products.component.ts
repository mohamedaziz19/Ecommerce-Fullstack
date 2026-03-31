import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-manage-products',
  standalone: false,
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css'],
})
export class ManageProductsComponent implements OnInit {
  products: any[] = [];
  selectedProduct: any = null;
  updatedProductData: any = { name: '', price: '' };

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getAllProducts().subscribe({
      next: (res) => (this.products = res),
      error: (err) => console.error(err),
    });
  }

  deleteProduct(productId: string): void {
    this.apiService.deleteProduct(productId).subscribe({
      next: () =>
        (this.products = this.products.filter((p) => p._id !== productId)),
      error: (err) => console.error(err),
    });
  }
  openEditModal(product: any): void {
    this.selectedProduct = product;
    this.updatedProductData = { name: product.name, price: product.price };
  }

  updateProduct(productId: string, updatedProductData: any): void {
    this.apiService.updateProduct(productId, updatedProductData).subscribe({
      next: (updatedProduct) => {
        this.products = this.products.map((product) =>
          product._id === productId ? updatedProduct : product
        );
      },
      error: (err) => console.error(err),
    });
  }
}
