import { ScriptService } from './scripts.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauComponent } from './tableau.component';
import { Component, ViewChild } from '@angular/core';

const publicUrl = 'https://public.tableau.com';
const privateUrl = 'https://private.tableau.com';
const report = 'HurricaneMichaelPowerOutages/Outages';
const ticket = 'm323AZ0XT3WZsR3fdapd_w==:1Y9a_sk3MLmoVmTpf0-An4z6';

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

  afterEach(() => {
    tableauComponent.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Tableau Viz should be defined', () => {
    const tableauElement = document.getElementById('tableauViz');
    expect(tableauElement).toBeDefined();
    expect(tableauElement.tagName).toEqual('DIV');
    expect(tableauElement.className).toEqual('ngx-tableau-viz');
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

  it('should create a tableauViz if contains any required Inputs', async(() => {
    tableauComponent.tableauVizUrl =
      'https://public.tableau.com/views/HurricaneMichaelPowerOutages/Outages';

    const spyOnRenderTableau = spyOn(
      tableauComponent,
      'renderTableauViz'
    ).and.callThrough();

    const spyOnCheckRequiredInputs = spyOn(
      tableauComponent,
      'checkRequiredInputs'
    )
      .and.callThrough()
      .and.returnValue(true);

    tableauComponent.renderTableauViz();

    TestBed.createComponent(TableauComponent).detectChanges();

    expect(spyOnRenderTableau).toHaveBeenCalled();
    expect(spyOnCheckRequiredInputs).toHaveBeenCalled();
    expect(spyOnCheckRequiredInputs()).toEqual(true);
    expect(tableauComponent.tableauViz).toBeDefined();
    expect(tableauComponent.tableauVizUrl).toBeDefined();
  }));

  it('should not create a tableauViz if not required Inputs', () => {
    tableauComponent.tableauVizUrl = '';
    tableauComponent.createUrlFromInputs = function() {
      return false;
    };

    const spyOnCheckRequiredInputs = spyOn(
      tableauComponent,
      'checkRequiredInputs'
    ).and.returnValue(false);

    tableauComponent.renderTableauViz();

    expect(spyOnCheckRequiredInputs).toHaveBeenCalled();
    expect(spyOnCheckRequiredInputs()).toEqual(false);
    expect(tableauComponent.tableauViz).toBeUndefined();
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

  it('should create tableauURL for a public server only with required Arguments: serverUrl and report', () => {
    const spyOnConsole = spyOn(console, 'log');
    tableauComponent.serverUrl = publicUrl;
    tableauComponent.report = report;

    tableauComponent.checkRequiredInputs();

    expect(tableauComponent.serverUrl).toBeDefined();
    expect(tableauComponent.report).toBeDefined();
    expect(tableauComponent.tableauVizUrl).toEqual(
      'https://public.tableau.com/views/HurricaneMichaelPowerOutages/Outages'
    );
    expect(spyOnConsole).toHaveBeenCalledWith(
      `Using Tableau visualization URL for public site: ${tableauComponent.tableauVizUrl}`
    );
    expect(tableauComponent.createUrlFromInputs()).toBe(true);
  });

  it('should create tableauURL for a private server only with required Arguments: serverURL, ticket and report', () => {
    const spyOnConsole = spyOn(console, 'log');
    tableauComponent.serverUrl = privateUrl;
    tableauComponent.report = report;
    tableauComponent.ticket = ticket;

    tableauComponent.createUrlFromInputs();

    expect(tableauComponent.tableauVizUrl).toEqual(
      'https://private.tableau.com/trusted/m323AZ0XT3WZsR3fdapd_w==:1Y9a_sk3MLmoVmTpf0-An4z6/views/HurricaneMichaelPowerOutages/Outages'
    );
    expect(spyOnConsole).toHaveBeenCalledWith(
      `Using Tableau visualization URL for private site: ${tableauComponent.tableauVizUrl}`
    );
    expect(tableauComponent.createUrlFromInputs()).toBe(true);
  });

  it('should create tableauURL for a private multiple site server only with required Arguments: serverURL, ticket, site and report', () => {
    const spyOnConsole = spyOn(console, 'log');

    tableauComponent.serverUrl = privateUrl;
    tableauComponent.report = report;
    tableauComponent.ticket = ticket;
    tableauComponent.site = 'site';

    tableauComponent.createUrlFromInputs();

    expect(tableauComponent.tableauVizUrl).toEqual(
      'https://private.tableau.com/trusted/m323AZ0XT3WZsR3fdapd_w==:1Y9a_sk3MLmoVmTpf0-An4z6/t/site/views/HurricaneMichaelPowerOutages/Outages'
    );
    expect(spyOnConsole).toHaveBeenCalledWith(
      `Using Tableau visualization URL for private multisite: ${tableauComponent.tableauVizUrl}`
    );
    expect(tableauComponent.createUrlFromInputs()).toBe(true);
  });

  it('should throught a console.error if one of the required inputs is missing', () => {
    const spyOnConsole = spyOn(console, 'error');

    tableauComponent.serverUrl = '';
    tableauComponent.report = report;
    tableauComponent.ticket = ticket;
    tableauComponent.site = 'site';

    tableauComponent.createUrlFromInputs();

    expect(tableauComponent.tableauVizUrl).toBeUndefined();
    expect(spyOnConsole).toHaveBeenCalledWith(
      'One or both of the following parameters are missing: serverUrl or report'
    );
    expect(tableauComponent.createUrlFromInputs()).toBe(false);
  });

  it('should disposed tableauViz after distroying', () => {
    TestBed.createComponent(TableauComponent).detectChanges();

    tableauComponent.tableauVizUrl =
      'https://public.tableau.com/views/HurricaneMichaelPowerOutages/Outages';

    const spyOnNgDestroy = spyOn(
      tableauComponent,
      'ngOnDestroy'
    ).and.callThrough();

    tableauComponent.renderTableauViz();

    tableauComponent.ngOnDestroy();

    expect(spyOnNgDestroy).toHaveBeenCalled();

    // expect(tableauComponent.tableauViz).toBe(undefined);
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
