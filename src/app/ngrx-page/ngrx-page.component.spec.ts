import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgrxPageComponent } from './ngrx-page.component';

describe('NgrxPageComponent', () => {
  let component: NgrxPageComponent;
  let fixture: ComponentFixture<NgrxPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgrxPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgrxPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
