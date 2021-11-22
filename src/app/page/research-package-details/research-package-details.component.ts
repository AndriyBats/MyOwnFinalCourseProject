import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAnalyzesResponse } from 'src/app/shared/interfaces/analyzes-and-cost/analyzes-and-cost.interface';
import { IPackageResponse } from 'src/app/shared/interfaces/research-package/products.inteface';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ResearchPackagesService } from 'src/app/shared/services/research-packages/research-packages.service';

@Component({
  selector: 'app-research-package-details',
  templateUrl: './research-package-details.component.html',
  styleUrls: ['./research-package-details.component.scss']
})
export class ResearchPackageDetailsComponent implements OnInit {
  public currentPackage!: IPackageResponse;
  public optionPrice: number = 1;
  public countPackage: number = 1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private researchPackageService: ResearchPackagesService,
    public location: Location
  ) { }

  ngOnInit(): void {
    this.loadCurrentPackage();
    this.changeOption();
  }

  loadCurrentPackage(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.researchPackageService.getOne(id).subscribe(data => {
      this.currentPackage = data;
    }, err => {
      console.log('load package error', err);

    })
  }

  changeOption(): void {
    if(this.countPackage >= 10 && this.countPackage < 20){
      this.optionPrice = 2;
    }else if(this.countPackage >= 20 && this.countPackage < 50){
      this.optionPrice = 3;
    }else if(this.countPackage >= 50){
      this.optionPrice = 4;
    }else {
      this.optionPrice = 1;
    }
    localStorage.setItem('optionPrice', JSON.stringify(this.optionPrice));
  }

  changeCount(researchPackage: IPackageResponse, status: boolean): void {
    if (status) {
      researchPackage.tickets?.forEach(element => {
        ++element.name.count;
        this.countPackage = element.name.count;
      });
    } else if (!status && this.countPackage > 1) {
      researchPackage.tickets?.forEach(element => {
        --element.name.count;
        this.countPackage = element.name.count;
      });
    }
    this.changeOption();
  }

  addToBasket(researchPackage: IPackageResponse): void {
    let basket: IAnalyzesResponse[] = [];
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      basket = JSON.parse(localStorage.getItem('basket') as string);
      researchPackage.tickets?.forEach(element => {
        if (basket.some(test => test.id === element.name.id)) {
          const index = basket.findIndex(test => test.id === element.name.id);
          basket[index].count += element.name.count;
        }
        else {
          basket.push(element.name);
        }
      })
    } else {
      researchPackage.tickets?.forEach(element => {
        basket.push(element.name);
      })
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    this.countPackage = 1;
    this.orderService.changeBasket.next(true);
  }

}