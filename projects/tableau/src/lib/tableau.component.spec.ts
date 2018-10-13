import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauComponent } from './tableau.component';

describe('TableauComponent', () => {
  let component: TableauComponent;
  let fixture: ComponentFixture<TableauComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableauComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
