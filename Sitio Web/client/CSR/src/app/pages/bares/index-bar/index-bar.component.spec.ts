import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexBarComponent } from './index-bar.component';

describe('IndexBarComponent', () => {
  let component: IndexBarComponent;
  let fixture: ComponentFixture<IndexBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
