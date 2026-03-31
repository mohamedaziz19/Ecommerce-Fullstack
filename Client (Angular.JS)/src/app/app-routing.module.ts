import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { AuthGuard } from './services/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { AddNewProductsComponent } from './add-new-products/add-new-products.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'all-products', component: ProductsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'checkout', component: CheckoutComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'products/:id', component: ProductDetailsComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'manage-products', component: ManageProductsComponent },
      { path: 'manage-orders', component: ManageOrdersComponent },
      { path: 'manage-users', component: ManageUsersComponent },
      { path: 'add-product', component: AddNewProductsComponent },
    ],
  },
  { path: '**', redirectTo: 'home' },
  // { path: 'About Us Product', component: SidebarComponent },
  // { path: 'Contact', component: CartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
