import { Component, OnInit } from '@angular/core';
import { IOrderResponse } from 'src/app/shared/interfaces/order/order.inteface';
import { IUserResponse } from 'src/app/shared/interfaces/users/user.inteface';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public adminOrders: Array<IOrderResponse> = [];
  public currentUser!: IUserResponse;

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) { }


  
  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getAll().subscribe(data => {
      this.adminOrders = data;
      this.currentUser = JSON.parse(localStorage.getItem('user') as string); 
      this.loadOrders    
    }, err => {
      console.log('load analyz error', err);
    })
  }

  signOut(): void {
    this.authService.logOut();    
  }

}
