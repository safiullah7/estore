import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {NotFoundComponent} from './not-found/not-found.component';

export const routes: Routes = [
  { path: 'home',
    loadChildren: () => import('./home/home.routes').then(m => m.routes) },
  { path:'', redirectTo:'/home/products', pathMatch:'full' },
  { path:'**', component: NotFoundComponent },
];
