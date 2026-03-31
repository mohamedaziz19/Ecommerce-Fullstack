import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  errorMessage: string = '';

  constructor(private apiService: ApiService, private router: Router) {}

  login(loginForm: NgForm) {
    if (loginForm.invalid) {
      return;
    }

    this.apiService.login(loginForm.value).subscribe({
      next: (res) => {
        console.log('Login successful', res);
        const token = res.accessToken;
        this.saveToken(token); 

        
        const decodedToken = this.decodeToken(token);
        const role = decodedToken.role;

        if (role === 'admin') {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/']); 
        }
      },
      error: (err) => {
        console.error('Login failed', err);
        this.errorMessage = 'Invalid email or password';
      },
    });

    console.log(loginForm.value);
  }

  saveToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  decodeToken(token: string): any {
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    return JSON.parse(decodedPayload);
  }
  
  showForm: boolean = true;

  onBackgroundClick(event: MouseEvent): void {
    const targetElement = event.target as HTMLElement;

    if (!targetElement.closest('.form-container')) {
      this.showForm = false;
      this.router.navigate(['/']);
    }
  }
}
