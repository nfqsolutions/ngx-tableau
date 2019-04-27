import { ScriptService } from './scripts.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauComponent } from './tableau.component';

describe('TableauComponent', () => {
  let component: TableauComponent;
  let fixture: ComponentFixture<TableauComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableauComponent],
      providers: [ScriptService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableauComponent);
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
    expect(component.tableauVizUrl).toEqual(
      // tslint:disable-next-line:max-line-length
      'https://public.tableau.com/views/HurricaneMichaelPowerOutages/Outages?:embed=y&:embed_code_version=3&:loadOrderID=0&:display_count=yes'
    );
  });
});
