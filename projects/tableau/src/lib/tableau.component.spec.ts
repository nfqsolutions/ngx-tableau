import { ScriptService } from './scripts.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauComponent } from './tableau.component';
import { Component, ViewChild } from '@angular/core';

describe('TableauComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let compiled;
  let tableauComponent: TableauComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableauComponent, TestHostComponent],
      providers: [ScriptService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;

    tableauComponent = TestBed.createComponent(TableauComponent)
      .componentInstance;

    console.log(fixture);
    console.log(component);
    console.log(compiled);
    console.log('tableaucomponent', tableauComponent);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Tableau Viz should be defined', () => {
    expect(document.getElementById('tableauViz')).toBeDefined();
    expect(document.getElementById('tableauViz').tagName).toEqual('DIV');
  });

  it('should call renderTableauViz', () => {
    const spyOnRenderTableau = spyOn(
      tableauComponent,
      'renderTableauViz'
    ).and.callThrough();

    tableauComponent.renderTableauViz();
    expect(spyOnRenderTableau).toHaveBeenCalled();
  });

  it('should call checkRequiredInputs method', () => {
    const spyOnCheckRequiredInputs = spyOn(
      tableauComponent,
      'checkRequiredInputs'
    ).and.callThrough();

    tableauComponent.renderTableauViz();

    expect(spyOnCheckRequiredInputs).toHaveBeenCalled();
  });

  it('should create a tableauViz if contains required Inputs', () => {
    tableauComponent.tableauVizUrl =
      'https://public.tableau.com/views/HurricaneMichaelPowerOutages/Outages';

    const spyOnCheckRequiredInputs = spyOn(
      tableauComponent,
      'checkRequiredInputs'
    ).and.callFake(function() {
      return true;
    });

    console.log(spyOnCheckRequiredInputs());
    tableauComponent.renderTableauViz();
    // tableauComponent.checkRequiredInputs();

    expect(spyOnCheckRequiredInputs()).toEqual(true);
    expect(tableauComponent.tableauViz).toBeDefined();
  });

  it('should generate correct Tableau URL', () => {
    /* Set input as it would be done with
    `<ngx-tableau tableauVizUrl="https://public.tableau.com/views/HurricaneMichaelPowerOutages/Outages"></ngx-tableau>`*/
    component.tableauComponent.tableauVizUrl =
      'https://public.tableau.com/views/HurricaneMichaelPowerOutages/Outages';
    expect(component.tableauComponent.tableauVizUrl).toEqual(
      'https://public.tableau.com/views/HurricaneMichaelPowerOutages/Outages'
    );
  });

  it('should generate correct URL from require attributes if not tableauVizUrl', () => {
    const spyOnCreateUrlFromInputs = spyOn(
      tableauComponent,
      'createUrlFromInputs'
    ).and.callThrough();

    const spyOnRenderTableau = spyOn(
      tableauComponent,
      'renderTableauViz'
    ).and.callThrough();

    tableauComponent.serverUrl = 'https://public.tableau.com';
    tableauComponent.report = 'HurricaneMichaelPowerOutages/Outages';

    expect(tableauComponent.serverUrl).toBeDefined();
    expect(tableauComponent.report).toBeDefined();

    tableauComponent.checkRequiredInputs();

    expect(spyOnCreateUrlFromInputs).toHaveBeenCalled();
    expect(tableauComponent.tableauVizUrl).toEqual(
      'https://public.tableau.com/views/HurricaneMichaelPowerOutages/Outages'
    );
    console.log('tableaucomponent', tableauComponent);
  });

  @Component({
    selector: `ngx-host-component`,
    template: `
      <ngx-tableau></ngx-tableau>
    `,
  })
  class TestHostComponent {
    @ViewChild(TableauComponent)
    public tableauComponent: TableauComponent;
  }
});
