import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IOrderResponse } from 'src/app/shared/interfaces/order/order.inteface';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
  @ViewChild('close') close!: ElementRef;
  public adminOrders: Array<IOrderResponse> = [];
  public status = 'PENDING';
  public pending = 0;
  public done = 0;
  

  constructor(private adminOrderService: OrderService) { }

  ngOnInit(): void {
      this.loadOrders();
  }

  loadOrders(): void {
    this.pending = 0;
    this.done = 0;
    this.adminOrderService.getAll().subscribe(data => {
      this.adminOrders = data;
      data.forEach(element => {
        if(element.status === 'PENDING'){
          ++ this.pending;
        }else{
          ++ this.done;
        }
      })
    }, err => {
      console.log('load analyz error', err);
    })
  }

  toDone(order: IOrderResponse): void {
    if(confirm('Ви дійсно підтверджеєте замовлення?')){
      order.status = 'DONE';
      this.adminOrderService.update(order, order.id as number).subscribe(() => {
        this.loadOrders();
      }, err => {
        console.log('update order error', err); 
      })
    }
  }

  changeStatus(status: string): void{
    this.status = status;
  }

}
