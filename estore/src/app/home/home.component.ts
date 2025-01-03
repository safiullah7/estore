import { Component } from '@angular/core';
import {CatnavigationComponent} from './components/catnavigation/catnavigation.component';
import {HeaderComponent} from './components/header/header.component';

@Component({
  selector: 'app-home',
  imports: [
    CatnavigationComponent,
    HeaderComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
