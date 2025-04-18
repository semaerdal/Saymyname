import { ComponentFixture, TestBed } from '@angular/core/testing';

import { homepageComponent } from './homepage.component';

describe('HomepageComponent', () => {
  let component: homepageComponent;
  let fixture: ComponentFixture<homepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [homepageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(homepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
