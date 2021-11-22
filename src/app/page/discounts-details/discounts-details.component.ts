import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IDiscountResponse } from 'src/app/shared/interfaces/discount/discount.interface';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';

@Component({
  selector: 'app-discounts-details',
  templateUrl: './discounts-details.component.html',
  styleUrls: ['./discounts-details.component.scss']
})
export class DiscountsDetailsComponent implements OnInit {
  public currentDiscount!: IDiscountResponse

  constructor(
    private activatedRoute: ActivatedRoute,
    private discountService: DiscountService,
    public location: Location
  ) { }

  ngOnInit(): void {
    this.loadCurrentDiscount()
  }

  loadCurrentDiscount(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.discountService.getOne(id).subscribe( data => {
      this.currentDiscount = data
    }, err => {
      console.log('load discount error', err);
     
    })
  }

}
