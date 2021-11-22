import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectCallComponent } from './object-call.component';

describe('ObjectCallComponent', () => {
  let component: ObjectCallComponent;
  let fixture: ComponentFixture<ObjectCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectCallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
