import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-color-filter',
  templateUrl: './color-filter.component.html',
  styleUrls: ['./color-filter.component.scss']
})
export class ColorFilterComponent {
  @Output() colorChanged: EventEmitter<string[]> = new EventEmitter<string[]>();

  colors: string[] = ['red', 'blue', 'green', 'yellow', 'orange','black','white']; 

  selectedColors: string[] = [];

  isColorSelected(color: string): boolean {
    return this.selectedColors.includes(color);
  }

  toggleColorFilter(color: string): void {
    if (this.isColorSelected(color)) {
      const index = this.selectedColors.indexOf(color);
      this.selectedColors.splice(index, 1);
    } else {
      this.selectedColors.push(color);
    }
    this.colorChanged.emit(this.selectedColors);
  }

  constructor() { }
}