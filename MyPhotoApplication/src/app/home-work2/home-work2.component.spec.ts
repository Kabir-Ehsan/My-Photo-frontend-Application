import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeWork2Component } from './home-work2.component';

describe('HomeWork2Component', () => {
  let component: HomeWork2Component;
  let fixture: ComponentFixture<HomeWork2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeWork2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeWork2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
