import { Component } from '@angular/core';
import { Expense } from '../../models/expense';
import { ExpensesService } from '../../services/expenses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DarkModeService } from '../../services/dark-mode.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-single-expense',
  templateUrl: './single-expense.component.html',
  styleUrl: './single-expense.component.scss',
})
export class SingleExpenseComponent {
  expense: Expense | undefined;
  isDarkMode$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private expensesService: ExpensesService,
    private darkModeService: DarkModeService,
  ) {
    this.isDarkMode$ = this.darkModeService.darkMode$ || of(false)!;
  }

  ngOnInit(): void {
    this.loadExpense();
  }

  loadExpense(): void {
    const expenseId = this.route.snapshot.paramMap.get('id');

    if (expenseId) {
      this.expensesService.getExpenseById(expenseId).subscribe((expense) => {
        this.expense = expense;
      });
    }
  }

  navigateToEditExpense(expense: Expense): void {
    this.router.navigate(['edit-expense', expense.uid]);
  }

  deleteExpense(expense: Expense): void {
    this.expensesService.deleteExpense(expense);
  }
}
