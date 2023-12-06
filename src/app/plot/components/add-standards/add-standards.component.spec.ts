import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStandardsComponent } from './add-standards.component';

describe('AddStandardsComponent', () => {
  let component: AddStandardsComponent;
  let fixture: ComponentFixture<AddStandardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddStandardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddStandardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
