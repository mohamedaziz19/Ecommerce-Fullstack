import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { RouterModule } from '@angular/router';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { CartService } from './services/cart.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageProductsComponent } from './manage-products/manage-products.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { AddNewProductsComponent } from './add-new-products/add-new-products.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    CheckoutComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ProductsComponent,
    LoginComponent,
    SignupComponent,
    SidebarComponent,
    ProductDetailsComponent,
    DashboardComponent,
    ManageProductsComponent,
    ManageOrdersComponent,
    ManageUsersComponent,
    AddNewProductsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SlickCarouselModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  providers: [provideHttpClient(), CartService],
  bootstrap: [AppComponent],
})
export class AppModule {}
