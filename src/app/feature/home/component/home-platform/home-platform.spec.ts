import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePlatform } from './home-platform';

describe('HomePlatform', () => {
  let component: HomePlatform;
  let fixture: ComponentFixture<HomePlatform>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePlatform],
    }).compileComponents();

    fixture = TestBed.createComponent(HomePlatform);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
