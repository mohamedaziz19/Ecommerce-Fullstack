import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(private router: Router) {}

  // Logout function
  logout() {
    localStorage.removeItem('accessToken');
    this.router.navigate(['/']);
  }
}
