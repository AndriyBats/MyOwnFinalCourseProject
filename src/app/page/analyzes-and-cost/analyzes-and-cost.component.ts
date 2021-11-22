import { Component, OnInit } from '@angular/core';
import { IAnalyzesResponse } from 'src/app/shared/interfaces/analyzes-and-cost/analyzes-and-cost.interface';
import { AnalyzesAndCostService } from 'src/app/shared/services/analyzes-and-cost/analyzes-and-cost.service';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-analyzes-and-cost',
  templateUrl: './analyzes-and-cost.component.html',
  styleUrls: ['./analyzes-and-cost.component.scss']
})
export class AnalyzesAndCostComponent implements OnInit {

  public pageAnalyzes: Array<IAnalyzesResponse> = [];
  public optionPrice: number = 1;
  public searchWord = '';
  public countAnalyz!: number;

  constructor(
    private analyzesAndCostService: AnalyzesAndCostService,
    private orderService: OrderService
  ) {
  }
  ngOnInit(): void {
    this.loadAnalyz();
    this.changeOption();
  }

  loadAnalyz(): void {
    this.analyzesAndCostService.getAll().subscribe(data => {
      this.pageAnalyzes = data;
    }, err => {
      console.log('load analyz error', err);
    })
    localStorage.setItem('optionPrice', JSON.stringify(this.optionPrice));
  }

  changeOption(): void{
    if(this.countAnalyz >= 10 && this.countAnalyz < 20){
      this.optionPrice = 2;
    }else if(this.countAnalyz >= 20 && this.countAnalyz < 50){
      this.optionPrice = 3;
    }else if(this.countAnalyz >= 50){
      this.optionPrice = 4;
    }else {
      this.optionPrice = 1;
    }
    localStorage.setItem('optionPrice', JSON.stringify(this.optionPrice));
  }

  changeCount(analyz: IAnalyzesResponse, status: boolean): void {
    if(status){
      ++analyz.count;
      this.countAnalyz = analyz.count
    }else if(!status && analyz.count > 1){
      --analyz.count;
      this.countAnalyz = analyz.count
    }
    this.changeOption();
  }
  

  addToBasket(analyz: IAnalyzesResponse): void {
    let basket: IAnalyzesResponse[] = [];
    if(localStorage.length > 0 && localStorage.getItem('basket')){
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if(basket.some(test => test.id === analyz.id)){
        const index = basket.findIndex(test => test.id === analyz.id);
        basket[index].count += analyz.count;
      }
      else {
        basket.push(analyz);
      }
    }else {
      basket.push(analyz);
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    analyz.count = 1;
    this.orderService.changeBasket.next(true);
  }
  
}
