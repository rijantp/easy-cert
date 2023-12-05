import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCropDetailsComponent } from './edit-crop-details.component';

describe('EditCropDetailsComponent', () => {
  let component: EditCropDetailsComponent;
  let fixture: ComponentFixture<EditCropDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCropDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditCropDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
