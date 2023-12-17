import { Component, Input } from '@angular/core';
import { Expense } from '../../models/expense';
import { Router } from '@angular/router';
import { ExpensesService } from '../../services/expenses.service';
import { Observable, of } from 'rxjs';
import { DarkModeService } from '../../services/dark-mode.service';

@Component({
  selector: 'app-table-expenses',
  templateUrl: './table-expenses.component.html',
  styleUrl: './table-expenses.component.scss'
})
export class TableExpensesComponent {
  isDarkMode$: Observable<boolean>;

  constructor(
    private router: Router,
    private darkModeService: DarkModeService,
    private expensesService: ExpensesService
  ) {
    this.isDarkMode$ = this.darkModeService.darkMode$ || of(false)!;
  }

  @Input() expenses: Expense[] = [];

  navigateToExpenseSingle(expense: Expense): void {
    this.router.navigate(['/expenses', expense.uid]);
  }

  navigateToEditExpense(expense: Expense): void {
    this.router.navigate(['edit-expense', expense.uid]);
  }

  deleteExpense(expense: Expense): void {
    this.expensesService.deleteExpense(expense);
  }
}
