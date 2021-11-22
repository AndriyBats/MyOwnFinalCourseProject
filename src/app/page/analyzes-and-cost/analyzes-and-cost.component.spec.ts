import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalyzesAndCostComponent } from './analyzes-and-cost.component';

describe('AnalyzesAndCostComponent', () => {
  let component: AnalyzesAndCostComponent;
  let fixture: ComponentFixture<AnalyzesAndCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalyzesAndCostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalyzesAndCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
