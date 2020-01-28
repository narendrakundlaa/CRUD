import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateForm2Component } from './create-form2.component';

describe('CreateForm2Component', () => {
  let component: CreateForm2Component;
  let fixture: ComponentFixture<CreateForm2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateForm2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateForm2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
