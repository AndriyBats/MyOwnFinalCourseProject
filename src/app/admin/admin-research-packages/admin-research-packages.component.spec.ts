import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminResearchPackagesComponent } from './admin-research-packages.component';

describe('AdminResearchPackagesComponent', () => {
  let component: AdminResearchPackagesComponent;
  let fixture: ComponentFixture<AdminResearchPackagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminResearchPackagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminResearchPackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
