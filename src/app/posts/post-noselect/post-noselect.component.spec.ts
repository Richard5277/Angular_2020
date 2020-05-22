import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostNoselectComponent } from './post-noselect.component';

describe('PostNoselectComponent', () => {
  let component: PostNoselectComponent;
  let fixture: ComponentFixture<PostNoselectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostNoselectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostNoselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
