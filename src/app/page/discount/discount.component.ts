import { Component, OnInit } from '@angular/core';
import { IDiscountRequest, IDiscountResponse } from 'src/app/shared/interfaces/discount/discount.interface';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent implements OnInit {
  public pageDiscounts: Array<IDiscountResponse> = [];

  constructor(private discountService: DiscountService) { }

  ngOnInit(): void {
    this.loadDiscounts()
  }

  loadDiscounts(): void {
    this.discountService.getAll().subscribe(data => {
      this.pageDiscounts = data;
    }, err => {
      console.log('load discount error', err);
    })
  }

}
