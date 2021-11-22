import { Component, OnInit, ViewChild } from '@angular/core';
import { IDiscountResponse } from 'src/app/shared/interfaces/discount/discount.interface';
import { INewsResponse } from 'src/app/shared/interfaces/news/news.interface';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';
import { NewsService } from 'src/app/shared/services/news/news.service';
import { HostListener } from "@angular/core";
import { IPackageResponse } from 'src/app/shared/interfaces/research-package/products.inteface';
import { ResearchPackagesService } from 'src/app/shared/services/research-packages/research-packages.service';
import { SlickCarouselComponent } from 'ngx-slick-carousel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public pageDiscounts: Array<IDiscountResponse> = [];
  public pagePackage: Array<IPackageResponse> = [];
  public pageNews: Array<INewsResponse> = [];
  public screenWidth!: number;

  constructor(
    private discountService: DiscountService,
    private researchPackageService: ResearchPackagesService,
    private newsService: NewsService,
  ) {
    this.onResize();
  }

  @ViewChild('slickModal1') slickModal1!: SlickCarouselComponent;
  @ViewChild('slickModal2') slickModal2!: SlickCarouselComponent;
  @ViewChild('slickModal3') slickModal3!: SlickCarouselComponent;

  next1() {
    this.slickModal1.slickNext();
  }
  next2() {
    this.slickModal2.slickNext();
  }
  next3() {
    this.slickModal3.slickNext();
  }
  prev1() {
    this.slickModal1.slickPrev();
  }
  prev2() {
    this.slickModal2.slickPrev();
  }
  prev3() {
    this.slickModal3.slickPrev();
  }
  ngOnInit(): void {
    this.loadDiscounts();
    this.loadPackage();
    this.loadNews();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth < 992) {
      this.slideConfig = { "slidesToShow": 1, "slidesToScroll": 1 };
    } else if (this.screenWidth > 992 && this.screenWidth < 1200) {
      this.slideConfig = { "slidesToShow": 2, "slidesToScroll": 1 };
    } else {
      this.slideConfig = { "slidesToShow": 3, "slidesToScroll": 1 };
    }
  }

  loadDiscounts(): void {
    this.discountService.getAll().subscribe(data => {
      this.pageDiscounts = data;
    }, err => {
      console.log('load discount error', err);
    })
  }

  loadPackage(): void {
    this.researchPackageService.getAll().subscribe(data => {
      this.pagePackage = data;
    }, err => {
      console.log('load product error', err);
    })
  }

  loadNews(): void {
    this.newsService.getAll().subscribe(data => {
      this.pageNews = data;
    }, err => {
      console.log('load news error', err);
    })
  }

  title = 'ng-carousel-demo';

  slideConfig = { "slidesToShow": 3, "slidesToScroll": 1 };

  slickInit(e: any) {
    // console.log('slick initialized');
  }

  breakpoint(e: any) {
    console.log('breakpoint');
  }

  afterChange(e: any) {
    console.log('afterChange');
  }

  beforeChange(e: any) {
    console.log('beforeChange');
  }













}
