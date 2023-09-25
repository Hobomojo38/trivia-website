import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TriviaPageComponent } from './trivia-page.component';

describe('TriviaPageComponent', () => {
  let component: TriviaPageComponent;
  let fixture: ComponentFixture<TriviaPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TriviaPageComponent]
    });
    fixture = TestBed.createComponent(TriviaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
