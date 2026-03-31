import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service'; 

@Component({
  selector: 'app-add-product',
  standalone: false,
  templateUrl: 'add-new-products.component.html',
  styleUrls: ['add-new-products.component.css'],
})
export class AddNewProductsComponent {
  addProductForm: FormGroup;
  selectedImage: File | null = null;

  constructor(private fb: FormBuilder, private apiService: ApiService) {

    this.addProductForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      price: ['', [Validators.required, Validators.min(1)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      category: ['', [Validators.required]],
      stock: ['', [Validators.required, Validators.min(0)]],
      image: [null, Validators.required],
    });
  }

  onImageSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedImage = file;
    }
  }

onSubmit(): void {
  if (this.addProductForm.valid && this.selectedImage) {
    const formData = new FormData();
    formData.append('name', this.addProductForm.get('name')?.value);
    formData.append('price', this.addProductForm.get('price')?.value);
    formData.append('description', this.addProductForm.get('description')?.value);
    formData.append('category', this.addProductForm.get('category')?.value);
    formData.append('stock', this.addProductForm.get('stock')?.value);
    formData.append('image', this.selectedImage, this.selectedImage.name); 

    this.apiService.addProduct(formData).subscribe({
      next: (response) => {
        console.log('Product added successfully!', response);
        alert('Product added successfully!');
        this.addProductForm.reset();
        this.selectedImage = null;
      },
      error: (err) => {
        console.error('Error:', err);
        alert('Failed to add product!');
      },
    });
  } else {
    alert('Please fill out all fields and upload an image.');
  }
}

}
