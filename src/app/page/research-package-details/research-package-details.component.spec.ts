import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchPackageDetailsComponent } from './research-package-details.component';

describe('ResearchPackageDetailsComponent', () => {
  let component: ResearchPackageDetailsComponent;
  let fixture: ComponentFixture<ResearchPackageDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResearchPackageDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchPackageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
