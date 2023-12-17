import { Component, Input } from '@angular/core';
import { ExpensesService } from '../../services/expenses.service';
import { Router } from '@angular/router';
import { Expense } from '../../models/expense';
import { DarkModeService } from '../../services/dark-mode.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-last-expense',
  templateUrl: './last-expense.component.html',
  styleUrl: './last-expense.component.scss',
})
export class LastExpenseComponent {
  isDarkMode$: Observable<boolean>;
  lastExpenses: Expense[] = [];
  isAddExpenseVisible = false;
  
  constructor(
    private router: Router,
    private darkModeService: DarkModeService,
    private expensesService: ExpensesService
  ) {
    this.isDarkMode$ = this.darkModeService.darkMode$ || of(false)!;
  }


  ngOnInit(): void {
    this.expensesService.getExpensesByUserId().subscribe((expenses) => {
      this.lastExpenses = expenses
        .sort((a, b) => {
          const dateA = new Date(a.transactionDate).getTime();
          const dateB = new Date(b.transactionDate).getTime();
          return dateB - dateA;
        })
        .slice(0, 5);
    });
  }

  toggleAddExpenseVisibility(): void {
    this.isAddExpenseVisible = !this.isAddExpenseVisible;
  }

  navigateToEditExpense(expense: Expense): void {
    this.router.navigate(['edit-expense', expense.uid]);
  }

  deleteExpense(expense: Expense): void {
    this.expensesService.deleteExpense(expense);
  }
  navigateToExpenses(): void {
    this.router.navigate(['/expenses']);
  }
}
