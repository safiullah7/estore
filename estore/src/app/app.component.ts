import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from './header/header.component';
import {CatnavigationComponent} from './catnavigation/catnavigation.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, CatnavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'estore';
}
