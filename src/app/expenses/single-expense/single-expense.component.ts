import { Component } from '@angular/core';
import { Expense } from '../../models/expense';
import { ExpensesService } from '../../services/expenses.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-expense',
  templateUrl: './single-expense.component.html',
  styleUrl: './single-expense.component.scss',
})
export class SingleExpenseComponent {
  expense: Expense | undefined;

  constructor(
    private route: ActivatedRoute,
    private expensesService: ExpensesService
  ) {}

  ngOnInit(): void {
    this.loadExpense();
  }

  loadExpense(): void {
    const expenseId = this.route.snapshot.paramMap.get('id');

    if (expenseId) {
      this.expensesService.getExpenseById(expenseId).subscribe((expense) => {
        this.expense = expense;
        console.log(expense);
        
      });
    }
  }
}
