import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { ProductsComponent } from '../pages/products/products.component';
import { ProductDetailsComponent } from '../pages/product-details/product-details.component';
import { AboutComponent } from '../pages/about/about.component';
import { NotFoundComponent } from '../pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'home' },
  { path: 'products', component: ProductsComponent, title: 'products' },
  {
    path: 'products/:id',
    component: ProductDetailsComponent,
  },
  { path: 'about', component: AboutComponent, title: 'about' },
  { path: '**', component: NotFoundComponent },
];
