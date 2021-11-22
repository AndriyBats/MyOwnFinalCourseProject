import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IAnalyzesResponse } from 'src/app/shared/interfaces/analyzes-and-cost/analyzes-and-cost.interface';
import { AnalyzesAndCostService } from 'src/app/shared/services/analyzes-and-cost/analyzes-and-cost.service';

@Component({
  selector: 'app-admin-analyzes-and-cost',
  templateUrl: './admin-analyzes-and-cost.component.html',
  styleUrls: ['./admin-analyzes-and-cost.component.scss']
})
export class AdminAnalyzesAndCostComponent implements OnInit {
  @ViewChild('close') close!: ElementRef;
  public adminAnalyzes: Array<IAnalyzesResponse> = [];
  public currentAnalyz!: IAnalyzesResponse;
  public currentAnalyzID!: number;
  public editStatus = false;
  public analyzForm!: FormGroup;
  public searchWord = '';

  constructor(
    private analyzesAndCostService: AnalyzesAndCostService,
    private fb: FormBuilder,
    private toastr: ToastrService,
  ) {  }

  ngOnInit(): void {
    this.initAnalyzForm();
    this.loadAnalyz();
  }

  initAnalyzForm(): void {
    this.analyzForm = this.fb.group({
      analyzName: [null, Validators.required],
      testMethod: [null, Validators.required],
      priceOption1: [null, Validators.required],
      priceOption2: [null, Validators.required],
      priceOption3: [null, Validators.required],
      priceOption4: [null, Validators.required],
      count: 1
    })
  }
  
  loadAnalyz(): void {
    this.analyzesAndCostService.getAll().subscribe(data => {
      this.adminAnalyzes = data;
    }, err => {
      console.log('load analyz error', err);
    })
  }

  saveAnalyz(): void {
    if (this.editStatus) {
      this.analyzesAndCostService.update(this.analyzForm.value, this.currentAnalyzID).subscribe(() => {
        this.loadAnalyz();
        this.editStatus = false;
        this.initAnalyzForm();
        this.close.nativeElement.click();
        this.toastr.success('Аналіз успішно відредаговано!');
      }, err => {
        console.log('update category error', err);
      });
    } else {
      this.analyzesAndCostService.create(this.analyzForm.value).subscribe(() => {
        this.close.nativeElement.click();
        this.loadAnalyz();
        this.initAnalyzForm();
        this.toastr.success('Аналіз успішно збережено!');
      }, err => {
        console.log('create category error', err);
      });
    }
  }
  deleteAnalyz(analyz: IAnalyzesResponse): void {
    if(confirm('Ви дійсно хочете видалити аналіз?')){
      this.analyzesAndCostService.delete(analyz.id).subscribe(() => {
        this.loadAnalyz();
        this.toastr.success('Аналіз успішно видалено!');
      }, err => {
        console.log('delete category error', err);
        this.toastr.error(err.message);
      });
    }
  }
  
  editAnalyz(analyz: IAnalyzesResponse): void {
    this.analyzForm.patchValue({
      analyzName: analyz.analyzName,
      testMethod: analyz.testMethod,
      priceOption1: analyz.priceOption1,
      priceOption2: analyz.priceOption2,
      priceOption3: analyz.priceOption3,
      priceOption4: analyz.priceOption4,
      count: 1
    });
    this.currentAnalyzID = analyz.id;
    this.editStatus = true;
  }
   
  valueByControl(control: string): string {
    return this.analyzForm.get(control)?.value;
  }

}
