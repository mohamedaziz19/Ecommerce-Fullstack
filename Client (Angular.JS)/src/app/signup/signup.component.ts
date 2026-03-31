import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  errorMessage: string = '';

  constructor(private apiService: ApiService,private router: Router) {}

  signup(signupForm : NgForm) {
    if (signupForm.invalid){
      return
    }

    this.apiService.signup(signupForm.value).subscribe({
      next: (res) => {
        alert('Signup Successful')
        this.router.navigate(['/'])
      },
      error: (err) => {
        console.error('Signup failed', err)
        this.errorMessage = `Signup failed: ${err.error.message || 'Please try again'}`;
      }
    })
    console.log(signupForm.value);
  }

  showForm:boolean = true

  onBackgroundClick(event:MouseEvent):void {
    const targetElement = event.target as HTMLElement;

    if (!targetElement.closest('.form-container')) {
      this.showForm = false;
      this.router.navigate(['/']);
    }
  }
  

}

