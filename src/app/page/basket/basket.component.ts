import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IAnalyzesResponse, IArrivalToPlaceRequest } from 'src/app/shared/interfaces/analyzes-and-cost/analyzes-and-cost.interface';
import { IUserResponse } from 'src/app/shared/interfaces/users/user.inteface';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  public basket: Array<IAnalyzesResponse> = [];
  public basketArrival: Array<IArrivalToPlaceRequest> = [];
  public total = 0;
  public optionPrice!: number;
  public orderForm!: FormGroup;
  public currentUser!: IUserResponse;
  submitted = false;

  constructor(
    private orderService: OrderService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initOrderForm()
    this.loadBasket();
    this.loadUser();
  }

  initOrderForm(): void {
    this.orderForm = this.fb.group({
      companyName: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30)
        ]
      ],
      firstAndLastName: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30)
        ]
      ],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern("[0-9 ]{10}")
        ]
      ],
      email: ['',
        [
          Validators.required,
          Validators.email
        ]
      ],
    })
  }

  loadBasket(): void {
    if(localStorage.length > 0 && localStorage.getItem('basket')){
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
    } else {
      this.basket = [];
    }
    this.setTotalPrice();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.orderForm.controls;
  }

  setTotalPrice(): void {
    if (this.basket.length === 0 && this.basketArrival.length === 0) {
      this.total = 0;
    } else {
      if (localStorage.length > 0 && localStorage.getItem('optionPrice')) {
        this.optionPrice = JSON.parse(localStorage.getItem('optionPrice') as string);
        if (this.optionPrice === 1) {
          this.total = this.basket.reduce((total, analyz) => total + Number(analyz.priceOption1) * Number(analyz.count), 0) + this.basketArrival.reduce((total, analyz) => total + Number(analyz.priceOption1) * Number(analyz.kilometer), 0);
        } else if (this.optionPrice === 2) {
          this.total = this.basket.reduce((total, analyz) => total + Number(analyz.priceOption2) * Number(analyz.count), 0)  + this.basketArrival.reduce((total, analyz) => total + Number(analyz.priceOption2) * Number(analyz.kilometer), 0);
        } else if (this.optionPrice === 3) {
          this.total = this.basket.reduce((total, analyz) => total + Number(analyz.priceOption3) * Number(analyz.count), 0)  + this.basketArrival.reduce((total, analyz) => total + Number(analyz.priceOption3) * Number(analyz.kilometer), 0);
        } else if (this.optionPrice === 4) {
          this.total = this.basket.reduce((total, analyz) => total + Number(analyz.priceOption4) * Number(analyz.count), 0)  + this.basketArrival.reduce((total, analyz) => total + Number(analyz.priceOption4) * Number(analyz.kilometer), 0);
        }
      }
    }
  }

  changeCount(product: IAnalyzesResponse, status: boolean): void {
    if(status){
      ++product.count;
    }
    else if(!status && product.count > 1) {
      --product.count;
    }
    localStorage.setItem('basket', JSON.stringify(this.basket));
    this.orderService.changeBasket.next(true);
  }

  changePayment(element: HTMLInputElement): void {
    this.orderForm.patchValue({
      payment: element.value
    });
  }
  
  deleteAnalyz(analyz: IAnalyzesResponse): void {
    if(confirm('Are you sure?')){
      const index = this.basket.findIndex(a => a.id === analyz.id);
      this.basket.splice(index, 1);
      localStorage.setItem('basket', JSON.stringify(this.basket));
      this.orderService.changeBasket.next(true);
    }
  }

  removeBasket(): void {
    if(confirm('Are you sure?')){
    localStorage.removeItem('basket');
    localStorage.removeItem('basketArrival');
    this.orderService.changeBasket.next(true);
    this.loadBasket();
    }
  }

  loadUser(): void {
    if(localStorage.length > 0 && localStorage.getItem('user')){
      this.currentUser = JSON.parse(localStorage.getItem('user') as string);
      this.orderForm.patchValue({
        companyName: this.currentUser.companyName,
        firstAndLastName: this.currentUser.firstAndLastName,
        phoneNumber: this.currentUser.phoneNumber,
        email: this.currentUser.email,
      });
    }else{
      this.initOrderForm();
    }
  }

  confirmOrder(): void {
    this.submitted = true;
    if (this.orderForm.invalid) {
      return;
    }
    const order = {
      ...this.orderForm.value,
      price: this.total,
      optionPrice: this.optionPrice,
      status: 'PENDING',
      basket: this.basket,
    }
    this.orderService.create(order).subscribe(() => {
      localStorage.removeItem('basket');
      this.orderService.changeBasket.next(false);
      this.loadBasket();
      this.initOrderForm();
      this.toastr.success('Ваше замовлення прийнято');
    }, err => {
      console.log(err);
    })
  }

  
}
