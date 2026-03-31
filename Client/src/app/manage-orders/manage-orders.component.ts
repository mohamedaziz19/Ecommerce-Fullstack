import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-manage-orders',
  standalone : false ,
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css'],
})
export class ManageOrdersComponent implements OnInit {
  orders: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.apiService.getOrders().subscribe({
      next: (res) => {
        this.orders = res;
      },
      error: (err) => {
        console.error('Error fetching orders:', err);
      },
    });
  }

  updateOrderStatus(orderId: string, status: string): void {
    this.apiService.updateOrderStatus(orderId, { status }).subscribe({
      next: (res) => {
        alert('Order status updated successfully!');
      },
      error: (err) => {
        console.error('Error updating order status:', err);
        alert('Failed to update order status.');
      },
    });
  }

  deleteOrder(orderId: string): void {
    if (confirm('Are you sure you want to delete this order?')) {
      this.apiService.deleteOrder(orderId).subscribe({
        next: (res) => {
          alert('Order deleted successfully!');
          this.orders = this.orders.filter((order) => order._id !== orderId);
        },
        error: (err) => {
          console.error('Error deleting order:', err);
          alert('Failed to delete order.');
        },
      });
    }
  }

  
}
