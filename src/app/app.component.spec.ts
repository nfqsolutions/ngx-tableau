import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TableauModule } from 'ngx-tableau';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TableauModule],
      declarations: [AppComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    console.log(fixture);
    console.log(app);
    fixture.detectChanges();
  });

  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));

  // it(`should have as title 'ngx-tableau'`, async(() => {
  //   // const fixture = TestBed.createComponent(AppComponent);
  //   // const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('ngx-tableau');
  // }));

  // it('should render title in a h1 tag', async(() => {
  //   // const fixture = TestBed.createComponent(AppComponent);
  //   // fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain(
  //     'Welcome to ngx-tableau!'
  //   );
  // }));
});
