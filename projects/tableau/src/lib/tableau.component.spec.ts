import { ScriptService } from './scripts.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauComponent } from './tableau.component';
import { Component, ViewChild } from '@angular/core';

describe('TableauComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableauComponent, TestHostComponent],
      providers: [ScriptService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Tableau Viz should be defined', () => {
    expect(document.getElementById('tableauViz')).toBeDefined();
    expect(document.getElementById('tableauViz').tagName).toEqual('DIV');
  });

  it('should generate correct Tableau URL', () => {
    /* Set input as it would be done with
    `<ngx-tableau tableauVizUrl="https://public.tableau.com/views/HurricaneMichaelPowerOutages/Outages"></ngx-tableau>`*/
    component.tableauComponent.tableauVizUrl = 'https://public.tableau.com/views/HurricaneMichaelPowerOutages/Outages';
    expect(component.tableauComponent.tableauVizUrl).toEqual(
      'https://public.tableau.com/views/HurricaneMichaelPowerOutages/Outages'
    );
  });


  @Component({
    selector: `ngx-host-component`,
    template: `<ngx-tableau></ngx-tableau>`
  })
  class TestHostComponent {
    @ViewChild(TableauComponent)
    public tableauComponent: TableauComponent;
  }
});

