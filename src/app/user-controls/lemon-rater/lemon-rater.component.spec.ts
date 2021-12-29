import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LemonRaterComponent } from './lemon-rater.component';

describe('LemonRaterComponent', () => {
  let component: LemonRaterComponent;
  let fixture: ComponentFixture<LemonRaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LemonRaterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LemonRaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
