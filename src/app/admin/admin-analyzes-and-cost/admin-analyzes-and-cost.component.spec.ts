import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAnalyzesAndCostComponent } from './admin-analyzes-and-cost.component';

describe('AdminAnalyzesAndCostComponent', () => {
  let component: AdminAnalyzesAndCostComponent;
  let fixture: ComponentFixture<AdminAnalyzesAndCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAnalyzesAndCostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAnalyzesAndCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
