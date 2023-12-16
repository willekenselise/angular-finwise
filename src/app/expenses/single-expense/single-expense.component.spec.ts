import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleExpenseComponent } from './single-expense.component';

describe('SingleExpenseComponent', () => {
  let component: SingleExpenseComponent;
  let fixture: ComponentFixture<SingleExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleExpenseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
