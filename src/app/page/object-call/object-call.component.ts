import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IAnalyzesResponse, IArrivalToPlaceRequest } from 'src/app/shared/interfaces/analyzes-and-cost/analyzes-and-cost.interface';
import { IUserResponse } from 'src/app/shared/interfaces/users/user.inteface';
import { AnalyzesAndCostService } from 'src/app/shared/services/analyzes-and-cost/analyzes-and-cost.service';
import { OrderService } from 'src/app/shared/services/order/order.service';

@Component({
  selector: 'app-object-call',
  templateUrl: './object-call.component.html',
  styleUrls: ['./object-call.component.scss']
})
export class ObjectCallComponent implements OnInit {
  public basket: Array<IAnalyzesResponse> = [];
  public basketArrival: Array<IArrivalToPlaceRequest> = [];
  public optionPrice!: number;
  public total = 0;
  public objectCallForm!: FormGroup;
  public objectCallAnalyzes: Array<IAnalyzesResponse> = [];
  public currentUser!: IUserResponse;
  public arrivalToPlace: IArrivalToPlaceRequest = {
    analyzName: "Виїзд на місце проведення аналізу",
    testMethod: "б/м",
    priceOption1: 24,
    priceOption2: 24,
    priceOption3: 24,
    priceOption4: 18,
    kilometer: 1
  }
  submitted = false;

  constructor(
    private orderService: OrderService,
    private analyzesAndCostService: AnalyzesAndCostService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadBasket();
    this.loadBasketArrival();
    this.loadAnalyz();
    this.initObjectCallForm()
    this.loadUser();
  }

  loadUser(): void {
    if(localStorage.length > 0 && localStorage.getItem('user')){
      this.currentUser = JSON.parse(localStorage.getItem('user') as string);
      this.objectCallForm.patchValue({
        companyName: this.currentUser.companyName,
        firstAndLastName: this.currentUser.firstAndLastName,
        phoneNumber: this.currentUser.phoneNumber,
        email: this.currentUser.email,
      });
    }else{
      this.initObjectCallForm();
    }
  }


  loadAnalyz(): void {
    this.analyzesAndCostService.getAll().subscribe(data => {
      this.objectCallAnalyzes = data;
    }, err => {
      console.log('load analyz error', err);
    })
  }

  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
    } else {
      this.basket = [];
    }
    this.setTotalPrice();
  }

  loadBasketArrival(): void {
    if (localStorage.length > 0 && localStorage.getItem('basketArrival')) {
      this.basketArrival = JSON.parse(localStorage.getItem('basketArrival') as string);
    } else {
      this.basketArrival = [];
    }
    this.setTotalPrice();
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
          this.total = this.basket.reduce((total, analyz) => total + Number(analyz.priceOption2) * Number(analyz.count), 0) + this.basketArrival.reduce((total, analyz) => total + Number(analyz.priceOption2) * Number(analyz.kilometer), 0);
        } else if (this.optionPrice === 3) {
          this.total = this.basket.reduce((total, analyz) => total + Number(analyz.priceOption3) * Number(analyz.count), 0) + this.basketArrival.reduce((total, analyz) => total + Number(analyz.priceOption3) * Number(analyz.kilometer), 0);
        } else if (this.optionPrice === 4) {
          this.total = this.basket.reduce((total, analyz) => total + Number(analyz.priceOption4) * Number(analyz.count), 0) + this.basketArrival.reduce((total, analyz) => total + Number(analyz.priceOption4) * Number(analyz.kilometer), 0);
        }
      }
    }
  }


  get f(): { [key: string]: AbstractControl } {
    return this.objectCallForm.controls;
  }

  initObjectCallForm(): void {
    this.objectCallForm = this.fb.group({
      companyName: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30),
          Validators.pattern("[A-Za-z]{2,}")
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
      dateArrival: ['', Validators.required],
      timeArrival: ['', Validators.required],
      addressArrival: ['',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ]],
      amountKilometers: ['', Validators.required],
    })
  }

  removeBasket(): void {
    if (confirm('Are you sure?')) {
      localStorage.removeItem('basket');
      localStorage.removeItem('basketArrival');
      this.orderService.changeBasket.next(true);
      this.loadBasket();
      this.loadBasketArrival();
    }
  }

  addAmountKilometers(event: any): void {
    let basketArrival: IArrivalToPlaceRequest[] = [];
    this.arrivalToPlace.kilometer = Number(event.target.value);
    if (localStorage.length > 0 && localStorage.getItem('basketArrival')) {
      basketArrival = JSON.parse(localStorage.getItem('basketArrival') as string);
      if (basketArrival.some(test => test.analyzName === "Виїзд на місце проведення аналізу")) {
        const index = basketArrival.findIndex(test => test.analyzName === "Виїзд на місце проведення аналізу");
        basketArrival.splice(index, 1, this.arrivalToPlace);
      }
      else {
        basketArrival.push(this.arrivalToPlace);
      }
    } else {
      basketArrival.push(this.arrivalToPlace);
    }
    localStorage.setItem('basketArrival', JSON.stringify(basketArrival));
    this.arrivalToPlace.kilometer = 1;
    this.orderService.changeBasket.next(true);
    this.loadBasket();
    this.loadBasketArrival();
  }

  confirmOrder(): void {
    this.submitted = true;
    if (this.objectCallForm.invalid) {
      return;
    }
    const order = {
      ...this.objectCallForm.value,
      price: this.total,
      optionPrice: this.optionPrice,
      status: 'PENDING',
      basket: this.basket,
      basketArrival: this.basketArrival,
    }
      this.orderService.create(order).subscribe(() => {
        localStorage.removeItem('basket');
        localStorage.removeItem('basketArrival');
        this.orderService.changeBasket.next(false);
        this.loadBasket();
        this.loadBasketArrival();
        this.initObjectCallForm();
        this.toastr.success('Ваше замовлення прийнято');
      }, err => {
        console.log(err);
      }) 
  }


}
