import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomehomepageComponent } from './homehomepage.component';

describe('HomehomepageComponent', () => {
  let component: HomehomepageComponent;
  let fixture: ComponentFixture<HomehomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomehomepageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomehomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
