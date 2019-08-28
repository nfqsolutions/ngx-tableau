import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TableauModule } from 'ngx-tableau';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let compiled;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TableauModule],
      declarations: [AppComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;

    compiled = fixture.debugElement.nativeElement;
    console.log(fixture);
    console.log(app);
    fixture.detectChanges();
  });

  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));

  it('should contain an ngx-tableau tag', () => {
    const tableauComponentTag = document.querySelector('ngx-tableau');

    expect(tableauComponentTag).toBeTruthy();
  });
});
