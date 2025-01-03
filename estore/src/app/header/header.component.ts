import { Component } from '@angular/core';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  imports: [
    FaIconComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  protected readonly faSearch = faSearch;
}
