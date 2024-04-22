import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.sass']
})
export class PriceComponent implements OnInit {


  public priceFrom: number = 750;
  public priceTo: number = 1599;
  @Output() priceFilters = new EventEmitter();

  public min : number = 100;
  public max : number = 1000;
  public range = [100,1000];

  constructor() { }

  ngOnInit() {  }

  priceChanged(event:any) {
    setInterval(() => {
      this.priceFilters.emit(event);
    }, 1000);
  }

  priceFilter() {
    this.priceFilters.emit({
      priceFrom: this.priceFrom,
      priceTo: this.priceTo
    });
  }
}