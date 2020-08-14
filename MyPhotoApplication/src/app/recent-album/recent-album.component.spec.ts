import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentAlbumComponent } from './recent-album.component';

describe('RecentAlbumComponent', () => {
  let component: RecentAlbumComponent;
  let fixture: ComponentFixture<RecentAlbumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentAlbumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentAlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
