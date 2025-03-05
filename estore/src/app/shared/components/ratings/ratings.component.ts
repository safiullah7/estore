import {Component, Input} from '@angular/core';
import {faStar, faStarHalfStroke, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {faStar as faStarEmpty} from '@fortawesome/free-regular-svg-icons';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-ratings',
  imports: [
    FaIconComponent,
    CommonModule
  ],
  templateUrl: './ratings.component.html',
  styleUrl: './ratings.component.scss'
})
export class RatingsComponent {
  faStar = faStar;
  faStarHalfStroke = faStarHalfStroke;
  faStarEmpty = faStarEmpty;

  stars: IconDefinition[] = [];
  private _score: number = 0;

  @Input()
  set score(value: number) {
    this._score = value > 5 ? 5 : value;

    const solidStarsCount = Math.floor(this._score);

    for (let i: number = 0; i < solidStarsCount; i++) {
      this.stars.push(faStar);
    }

    if (this._score - solidStarsCount > 0 && this._score - solidStarsCount < 1) {
      this.stars.push(faStarHalfStroke)
    }

    for (let i: number = this.stars.length; i < 5; i++) {
      this.stars.push(faStarEmpty)
    }
  }
}
