import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyCategoryDialogComponent } from './modify-category-dialog.component';

describe('ModifyCategoryDialogComponent', () => {
  let component: ModifyCategoryDialogComponent;
  let fixture: ComponentFixture<ModifyCategoryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyCategoryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyCategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
