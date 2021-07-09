import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './features/categories/categories.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { ProductsComponent } from './features/products/products.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { HomePageGuardService } from './services/home-page-guard.service';

const routes: Routes = [
  {
    path: 'landing', component: HomepageComponent, canActivate: [HomePageGuardService],
    children: [
      { path: '', component: CategoriesComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'product/:category', component: ProductsComponent },
      { path: 'checkout', component: CheckoutComponent }
    ]
  },
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
