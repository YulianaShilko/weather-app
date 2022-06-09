import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogServiceChoiceComponent } from './dialog-service-choice.component';

describe('DialogServiceChoiceComponent', () => {
  let component: DialogServiceChoiceComponent;
  let fixture: ComponentFixture<DialogServiceChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogServiceChoiceComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogServiceChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
