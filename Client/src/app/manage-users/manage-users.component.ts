import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css'],
})
export class ManageUsersComponent implements OnInit {
  users: any[] = [];
  userService: any;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.apiService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  toggleRole(userId: string, role: string) {
    console.log('User ID:', userId);
    if (userId) {

  this.apiService.updateUserRole(userId, role).subscribe({
    next: (res: any) => {
      alert('Role updated:');
    },
    error: (err: any) => {
      console.error('Error updating role:', err);
    },
  });

    } else {
      console.error('User ID is undefined!');
    }
  }
}
