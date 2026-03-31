import { Component, OnInit ,  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-product-details',
  standalone: false,
  
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  product: any;

  constructor(private route: ActivatedRoute , private apiService: ApiService) {}

  ngOnInit(): void {
  const productId = this.route.snapshot.paramMap.get('id');
  this.fetchProductDetails(productId);
  }

  fetchProductDetails(productId : string | null) {
    if (productId) {
      this.apiService.getProductById(productId).subscribe({
        next: (data) => {
          this.product = data;
        },
        error: (err) => {
          console.error('Error fetching product:', err);
        },
      });
    }
  }

  
}
