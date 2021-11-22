import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchPackageComponent } from './research-package.component';

describe('ResearchPackageComponent', () => {
  let component: ResearchPackageComponent;
  let fixture: ComponentFixture<ResearchPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResearchPackageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
