import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStandardsComponent } from './edit-standards.component';

describe('EditStandardsComponent', () => {
  let component: EditStandardsComponent;
  let fixture: ComponentFixture<EditStandardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditStandardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditStandardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
