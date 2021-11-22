import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { IAnalyzesResponse, IArrivalToPlaceRequest } from 'src/app/shared/interfaces/analyzes-and-cost/analyzes-and-cost.interface';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { OrderService } from 'src/app/shared/services/order/order.service';
import Validation from './utils/validation';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],

})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild('close') close!: ElementRef;
  public total = 0;
  public countAnalyzes = 0;
  public basket: Array<IAnalyzesResponse> = [];
  public basketArrival: Array<IArrivalToPlaceRequest> = [];
  public optionPrice!: number;
  public registerForm!: FormGroup;
  public signUpForm!: FormGroup;
  public loginSubscription!: Subscription;
  public isSignUp = false;
  public isOffCanvasTopToDown = false;
  public positionScroll!: number;
  public statusButtonScroll = false;
  submitted = false;
  public isUserLogin = false;
  public isAdminLogin = false;


  constructor(
    private orderService: OrderService,
    private afs: Firestore,
    private auth: Auth,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) { }

  @HostListener("window:scroll", ['$event'])
  onWindowScroll(event?: any) {
    this.positionScroll = window.pageYOffset;
    if (this.positionScroll > 600) {
      this.statusButtonScroll = true;
    } else {
      this.statusButtonScroll = false;
    }
  }

  scrollToTop(): void {
    window.scroll(0, 0);
  }

  ngOnInit(): void {
    this.loadBasket();
    this.loadBasketArrival();
    this.checkChangeBasket();
    this.initRegisterForm();
    this.initSignUpForm();
    this.getAuthData();
    this.checkLogin();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.signUpForm.controls;
  }


  onReset(): void {
    this.submitted = false;
    this.signUpForm.reset();
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
      this.countAnalyzes = 0;
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
        this.countAnalyzes = this.basket.reduce((countAnalyzes, analyz) => countAnalyzes + Number(analyz.count), 0);
      }
    }
  }

  checkChangeBasket(): void {
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket();
      this.loadBasketArrival();
    }, err => {
      console.log('Change basket error', err);
    })
  }

  initRegisterForm(): void {
    this.registerForm = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    })

  }

  initSignUpForm(): void {
    this.signUpForm = this.formBuilder.group(
      {
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
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue]
      },
      {
        validators: [Validation.match('password', 'confirmPassword')]
      }
    );
  }

  getAuthData(): void {
    if (localStorage.length > 0 && localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user') as string);
      if (user && user.role === 'ADMIN') {
        this.isAdminLogin = true;
        this.isUserLogin = false;
      } else if (user && user.role === 'USER') {
        this.isAdminLogin = false;
        this.isUserLogin = true;
      } else {
        this.isAdminLogin = false;
        this.isUserLogin = false;
      }
    } else {
      this.isAdminLogin = false;
      this.isUserLogin = false;
    }
  }

  checkLogin(): void {
    this.authService.currentUser$.subscribe(() => {
      this.getAuthData();
    })
  }

  signIn(): void {
    const { email, password } = this.registerForm.value;
    this.login(email, password);
    setTimeout(() => {
      if(localStorage.length > 0 && localStorage.getItem('user')){
       this.close.nativeElement.click();
       this.toastr.success('Ви увійшли в особистий кабінет!');
      }else{
        this.toastr.success('Невірний логін або пароль!');
        this.initRegisterForm();
      }
      this.loginSubscription.unsubscribe();
    }, 2000)
  }

  async login(email: string, password: string): Promise<any> {
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
    this.loginSubscription = docData(doc(this.afs, 'users', credential.user.uid)).subscribe(user => {
      localStorage.setItem('user', JSON.stringify(user));
      if (user && user.role === 'ADMIN') {
        this.router.navigate(['/admin']);
      } else if (user && user.role === 'USER') {
        this.router.navigate(['/profile']);
      }
      this.authService.currentUser$.next(true);
    });
  };

  signUp(): void {
    this.submitted = true;
    if (this.signUpForm.invalid) {
      return;
    }
    console.log(JSON.stringify(this.signUpForm.value, null, 2));
    const { email, password } = this.signUpForm.value;
    this.emailSignUp(email, password).then(data => {
      console.log(data);
    });
    this.fromSignUp();
    this.toastr.success('Ви успішно зареєструвалися!');
  }

  async emailSignUp(email: string, password: string): Promise<any> {
    const credential = await createUserWithEmailAndPassword(this.auth, email, password);
    const user = {
      email: credential.user.email,
      ...this.signUpForm.value,
      role: 'USER'
    }
    let data = await setDoc(doc(this.afs, "users", credential.user.uid), user);
    return data;
  }

  ngOnDestroy(): void {
    this.loginSubscription.unsubscribe();
  }

  toSignUp(): void {
    this.isSignUp = true;
  }

  fromSignUp(): void {
    this.isSignUp = false;
  }

  offCanvasTopToDown(): void {
    this.isOffCanvasTopToDown = true;
  }
  offCanvasTopToTop(): void {
    this.isOffCanvasTopToDown = false;
  }

  signOut(): void {
    this.loginSubscription.unsubscribe();
    this.authService.logOut();
  }


}
