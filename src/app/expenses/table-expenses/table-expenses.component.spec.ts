import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableExpensesComponent } from './table-expenses.component';

describe('TableExpensesComponent', () => {
  let component: TableExpensesComponent;
  let fixture: ComponentFixture<TableExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableExpensesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
