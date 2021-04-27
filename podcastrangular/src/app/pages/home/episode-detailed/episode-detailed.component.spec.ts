import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodeDetailedComponent } from './episode-detailed.component';

describe('EpisodeDetailedComponent', () => {
  let component: EpisodeDetailedComponent;
  let fixture: ComponentFixture<EpisodeDetailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EpisodeDetailedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EpisodeDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
