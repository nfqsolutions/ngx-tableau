import { MockScriptService } from './../testAssets/test-script-service';
import { ScriptService } from './scripts.service';
import {
  async,
  ComponentFixture,
  TestBed,
  inject,
} from '@angular/core/testing';
import { TableauComponent } from './tableau.component';
import { Component, ViewChild } from '@angular/core';

const publicUrl = 'https://public.tableau.com';
const privateUrl = 'https://private.tableau.com';
const report = 'HurricaneMichaelPowerOutages/Outages';
const ticket = 'm323AZ0XT3WZsR3fdapd_w==:1Y9a_sk3MLmoVmTpf0-An4z6';

describe('Tableau Component Integration', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableauComponent, TestHostComponent],
      providers: [
        {
          provide: ScriptService,
          useClass: MockScriptService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  }));

  afterEach(() => {
    component.tableauComponent.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate correct Tableau URL using tableauVizUrl', () => {
    /* Set input as it would be done with
    `<ngx-tableau [tableauVizUrl]="'https://public.tableau.com/views/HurricaneMichaelPowerOutages/Outages'"></ngx-tableau>`*/
    component.tableauComponent.tableauVizUrl =
      'https://public.tableau.com/views/HurricaneMichaelPowerOutages/Outages';

    component.tableauComponent.renderTableauViz();

    expect(component.tableauComponent.tableauVizUrl).toEqual(
      'https://public.tableau.com/views/HurricaneMichaelPowerOutages/Outages'
    );
  });

  it('should generate correct Tableau URL using serverUrl and report', () => {
    /* Set input as it would be done with
    `<ngx-tableau [serverUrl]="publicUrl" [report]="report"></ngx-tableau>`*/
    component.tableauComponent.serverUrl = publicUrl;
    component.tableauComponent.report = report;

    component.tableauComponent.renderTableauViz();

    expect(component.tableauComponent.tableauVizUrl).toEqual(
      'https://public.tableau.com/views/HurricaneMichaelPowerOutages/Outages'
    );
  });

  it('should generate correct Tableau URL using serverUrl, report and ticket', () => {
    /* Set input as it would be done with
    `<ngx-tableau [serverUrl]="privateUrl" [ticket]="ticket" [report]="report"></ngx-tableau>`*/
    component.tableauComponent.serverUrl = privateUrl;
    component.tableauComponent.ticket = ticket;
    component.tableauComponent.report = report;

    component.tableauComponent.renderTableauViz();

    expect(component.tableauComponent.tableauVizUrl).toEqual(
      'https://private.tableau.com/trusted/m323AZ0XT3WZsR3fdapd_w==:1Y9a_sk3MLmoVmTpf0-An4z6/views/HurricaneMichaelPowerOutages/Outages'
    );
  });

  it('should generate correct Tableau URL using serverUrl, report, ticket and site', () => {
    /* Set input as it would be done with
    `<ngx-tableau [serverUrl]="privateUrl" [ticket]="ticket" [site]="'site" [report]="report"></ngx-tableau>`*/
    component.tableauComponent.serverUrl = privateUrl;
    component.tableauComponent.ticket = ticket;
    component.tableauComponent.site = 'site';
    component.tableauComponent.report = report;

    component.tableauComponent.renderTableauViz();

    expect(component.tableauComponent.tableauVizUrl).toEqual(
      'https://private.tableau.com/trusted/m323AZ0XT3WZsR3fdapd_w==:1Y9a_sk3MLmoVmTpf0-An4z6/t/site/views/HurricaneMichaelPowerOutages/Outages'
    );
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

describe('TableauComponent', () => {
  let fixtureComponent: ComponentFixture<TableauComponent>;
  let tableauComponent: TableauComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableauComponent],
      providers: [
        {
          provide: ScriptService,
          useClass: MockScriptService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(async(() => {
    fixtureComponent = TestBed.createComponent(TableauComponent);
    tableauComponent = fixtureComponent.componentInstance;

    fixtureComponent.detectChanges();
  }));

  afterEach(() => {
    tableauComponent.ngOnDestroy();
  });

  it('should create', () => {
    expect(tableauComponent).toBeTruthy();
  });

  it('Tableau Viz should be defined', () => {
    const tableauElement = document.getElementById('tableauViz');
    expect(tableauElement).toBeDefined();
    expect(tableauElement.tagName).toEqual('DIV');
    expect(tableauElement.className).toEqual('ngx-tableau-viz');
  });

  it('should call createUrlFromInputs method if not tableauVizUrl', async(() => {
    const spyOnCreateUrlFromInputs = spyOn(
      tableauComponent,
      'createUrlFromInputs'
    ).and.callThrough();

    tableauComponent.tableauVizUrl = '';
    tableauComponent.serverUrl = publicUrl;
    tableauComponent.report = report;

    tableauComponent.renderTableauViz();

    expect(spyOnCreateUrlFromInputs).toHaveBeenCalled();
  }));

  it('should call multisiteUrlOrNot method when creating Url from inputs', () => {
    tableauComponent.serverUrl = privateUrl;
    tableauComponent.report = report;
    tableauComponent.ticket = ticket;

    const spyOnMultisiteUrlOrNot = spyOn(
      tableauComponent,
      'multisiteUrlOrNot'
    ).and.callThrough();

    tableauComponent.renderTableauViz();

    expect(spyOnMultisiteUrlOrNot).toHaveBeenCalled();
  });

  it('should multisiteUrlOrNot method return an Url containing the "site" if is a multiplesite server', async(() => {
    tableauComponent.serverUrl = privateUrl;
    tableauComponent.report = report;
    tableauComponent.ticket = ticket;
    tableauComponent.site = 'site';

    const spyOnMultisiteUrlOrNot = spyOn(
      tableauComponent,
      'multisiteUrlOrNot'
    ).and.callThrough();

    tableauComponent.renderTableauViz();

    expect(spyOnMultisiteUrlOrNot).toHaveBeenCalled();
    expect(tableauComponent.multisiteUrlOrNot()).toEqual(
      '/t/site/views/HurricaneMichaelPowerOutages/Outages'
    );
  }));

  it('should multisiteUrlOrNot method return an Url with no "site"', () => {
    tableauComponent.serverUrl = privateUrl;
    tableauComponent.report = report;
    tableauComponent.ticket = ticket;

    const spyOnMultisiteUrlOrNot = spyOn(
      tableauComponent,
      'multisiteUrlOrNot'
    ).and.callThrough();

    tableauComponent.renderTableauViz();

    expect(spyOnMultisiteUrlOrNot).toHaveBeenCalled();
    expect(tableauComponent.multisiteUrlOrNot()).toEqual(
      '/views/HurricaneMichaelPowerOutages/Outages'
    );
  });

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

  it('should throw a console.error if one of the required inputs is missing', () => {
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

  it('should disposed tableauViz after distroying', async(() => {
    tableauComponent.tableauVizUrl =
      'https://public.tableau.com/views/HurricaneMichaelPowerOutages/Outages';

    const spyOnNgDestroy = spyOn(
      tableauComponent,
      'ngOnDestroy'
    ).and.callThrough();

    tableauComponent.renderTableauViz();

    const spyOnDispose = spyOn(
      tableauComponent.tableauViz,
      'dispose'
    ).and.callThrough();

    tableauComponent.ngOnDestroy();

    expect(spyOnNgDestroy).toHaveBeenCalled();
    expect(spyOnDispose).toHaveBeenCalled();
  }));

  it('should do nothing on ngOnInit', () => {
    const spyNgOnInit = spyOn(tableauComponent, 'ngOnInit');

    tableauComponent.ngOnInit();

    expect(spyNgOnInit).toHaveBeenCalled();
  });
});

describe('Tableau Component constructor', () => {
  let tableauComponent: TableauComponent;
  let fixture: ComponentFixture<TableauComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableauComponent],
      providers: [ScriptService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableauComponent);
    tableauComponent = fixture.componentInstance;

    fixture.detectChanges();
  });

  afterEach(() => {
    tableauComponent.ngOnDestroy();
  });

  it('should has a ScriptService injected in the constructor', inject(
    [ScriptService],
    (scriptService: ScriptService) => {
      expect(scriptService).toBeDefined();
    }
  ));
});
