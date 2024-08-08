import { CommonModule, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'rate-driver',
  standalone: true,
  imports: [
    NgFor,
    CommonModule
  ],
  templateUrl: './rate-driver.component.html',
  styleUrl: './rate-driver.component.scss'
})
export class RateDriverComponent{
  @Input() rating: number = 0;    
  @Input() maxRating: number = 5; 
  @Input() readonly: boolean = false; 
  @Output() ratingChange = new EventEmitter<number>();

  stars: boolean[] = [];

  constructor(){}

  ngOnChanges() {
    this.updateStars();
  }

  updateStars() {
    this.stars = Array(this.maxRating).fill(false).map((_, index) => index < this.rating);
  }
  
  setRating(rating: number) {
    if (this.readonly) {
      return;
    }

    this.rating = rating;
    this.updateStars();
    this.ratingChange.emit(this.rating);
  }

  hoverRating(rating: number) {
    if (this.readonly) {
      return;
    }

    this.stars = Array(this.maxRating).fill(false).map((_, index) => index < rating);
  }

  clearHover() {
    if (this.readonly) {
      return;
    }
    
    this.updateStars();
  }
  
}
