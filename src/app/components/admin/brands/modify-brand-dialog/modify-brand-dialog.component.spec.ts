import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyBrandDialogComponent } from './modify-brand-dialog.component';

describe('ModifyBrandDialogComponent', () => {
  let component: ModifyBrandDialogComponent;
  let fixture: ComponentFixture<ModifyBrandDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyBrandDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyBrandDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
