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

  it('should call createUrlFromInputs method if not tableauVizUrl', () => {
    const spyOnCreateUrlFromInputs = spyOn(
      tableauComponent,
      'createUrlFromInputs'
    ).and.callThrough();

    tableauComponent.renderTableauViz();

    expect(spyOnCreateUrlFromInputs).toHaveBeenCalled();
  });

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

  it('should multisiteUrlOrNot method return an Url containing the "site" if is a multiplesite server', () => {
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
  });

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
    const spyOnCreateUrlFromInputs = spyOn(
      tableauComponent,
      'createUrlFromInputs'
    ).and.callThrough();

    tableauComponent.serverUrl = publicUrl;
    tableauComponent.report = report;

    tableauComponent.checkRequiredInputs();

    expect(tableauComponent.serverUrl).toBeDefined();
    expect(tableauComponent.report).toBeDefined();
    expect(tableauComponent.tableauVizUrl).toBeDefined();
    expect(tableauComponent.tableauVizUrl).toEqual(
      'https://public.tableau.com/views/HurricaneMichaelPowerOutages/Outages'
    );
    expect(spyOnConsole).toHaveBeenCalledWith(
      `Using Tableau visualization URL for public site: ${tableauComponent.tableauVizUrl}`
    );
    expect(spyOnCreateUrlFromInputs).toHaveBeenCalled();
    expect(tableauComponent.createUrlFromInputs()).toBe(true);
  });

  it('should create tableauURL for a private server only with required Arguments: serverURL, ticket and report', () => {
    const spyOnConsole = spyOn(console, 'log');
    const spyOnCreateUrlFromInputs = spyOn(
      tableauComponent,
      'createUrlFromInputs'
    ).and.callThrough();

    tableauComponent.serverUrl = privateUrl;
    tableauComponent.report = report;
    tableauComponent.ticket = ticket;

    tableauComponent.checkRequiredInputs();

    expect(tableauComponent.tableauVizUrl).toBeDefined();
    expect(tableauComponent.tableauVizUrl).toEqual(
      'https://private.tableau.com/trusted/m323AZ0XT3WZsR3fdapd_w==:1Y9a_sk3MLmoVmTpf0-An4z6/views/HurricaneMichaelPowerOutages/Outages'
    );
    expect(spyOnConsole).toHaveBeenCalledWith(
      `Using Tableau visualization URL for private site: ${tableauComponent.tableauVizUrl}`
    );
    expect(spyOnCreateUrlFromInputs).toHaveBeenCalled();
    expect(tableauComponent.createUrlFromInputs()).toBe(true);
  });

  it('should create tableauURL for a private multiple site server only with required Arguments: serverURL, ticket, site and report', () => {
    const spyOnConsole = spyOn(console, 'log');
    const spyOnCreateUrlFromInputs = spyOn(
      tableauComponent,
      'createUrlFromInputs'
    ).and.callThrough();

    tableauComponent.serverUrl = privateUrl;
    tableauComponent.report = report;
    tableauComponent.ticket = ticket;
    tableauComponent.site = 'site';

    tableauComponent.checkRequiredInputs();

    expect(tableauComponent.tableauVizUrl).toBeDefined();
    expect(tableauComponent.tableauVizUrl).toEqual(
      'https://private.tableau.com/trusted/m323AZ0XT3WZsR3fdapd_w==:1Y9a_sk3MLmoVmTpf0-An4z6/t/site/views/HurricaneMichaelPowerOutages/Outages'
    );
    expect(spyOnConsole).toHaveBeenCalledWith(
      `Using Tableau visualization URL for private site: ${tableauComponent.tableauVizUrl}`
    );
    expect(spyOnCreateUrlFromInputs).toHaveBeenCalled();
    expect(tableauComponent.createUrlFromInputs()).toBe(true);
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

  it('should disposed tableauViz after distroying', () => {
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
    console.log('VIZ', tableauComponent.tableauViz);
  });

  it('should has a ScriptService injected in the constructor', inject(
    [ScriptService],
    (scriptService: ScriptService) => {
      expect(scriptService).toBeDefined();
    }
  ));

  it('should call load method onscriptService in the constructor', inject(
    [ScriptService],
    (scriptService: ScriptService) => {
      const spyOnLoad = spyOn(scriptService, 'load').and.callThrough();
      TestBed.createComponent(TableauComponent);

      expect(spyOnLoad).toHaveBeenCalled();
      expect(spyOnLoad).toHaveBeenCalledWith('tableau');
    }
  ));

  it('should call load method on scriptService in the constructor and throw error', inject(
    [ScriptService],
    async (scriptService: ScriptService) => {
      const spyOnLoad = spyOn(scriptService, 'load')
        .and.callThrough()
        .and.returnValue(Promise.reject('testing error'));

      const spyOnCatch = spyOn(scriptService.load(), 'catch').and.callThrough();

      TestBed.createComponent(TableauComponent);

      expect(spyOnLoad).toHaveBeenCalled();

      setTimeout(async () => {
        console.log('uuuuuuuuuuu', spyOnCatch());
        await expect(spyOnCatch).toHaveBeenCalled();
      }, 500);
    }
  ));

  it('should call load method on scriptService in the constructor and then renderViz method', inject(
    [ScriptService],
    (scriptService: ScriptService) => {
      const spyOnLoad = spyOn(scriptService, 'load').and.callThrough();

      TestBed.createComponent(TableauComponent);
      const spyOnRenderViz = spyOn(
        tableauComponent,
        'renderTableauViz'
      ).and.callThrough();

      expect(spyOnLoad).toHaveBeenCalled();
      expect(spyOnLoad).toHaveBeenCalledWith('tableau');

      setTimeout(async () => {
        expect(spyOnRenderViz).toHaveBeenCalled();
      }, 500);

      // await expect(spyOnRenderViz).toHaveBeenCalled();
    }
  ));

  it('should do nothing on ngOnInit', () => {
    const spyNgOnInit = spyOn(tableauComponent, 'ngOnInit');

    tableauComponent.ngOnInit();

    expect(spyNgOnInit).toHaveBeenCalled();
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
