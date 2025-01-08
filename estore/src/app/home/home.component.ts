import { Component } from '@angular/core';
import {CatnavigationComponent} from './components/catnavigation/catnavigation.component';
import {HeaderComponent} from './components/header/header.component';
import {SidenavigationComponent} from './sidenavigation/sidenavigation.component';
import {ProductsComponent} from './components/products/products.component';

@Component({
  selector: 'app-home',
  imports: [
    CatnavigationComponent,
    HeaderComponent,
    SidenavigationComponent,
    ProductsComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
