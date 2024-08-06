import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrivesMyComponent } from './drives-my.component';

describe('DrivesMyComponent', () => {
  let component: DrivesMyComponent;
  let fixture: ComponentFixture<DrivesMyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrivesMyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrivesMyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
