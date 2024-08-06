import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrivesNewComponent } from './drives-new.component';

describe('DrivesNewComponent', () => {
  let component: DrivesNewComponent;
  let fixture: ComponentFixture<DrivesNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrivesNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrivesNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
