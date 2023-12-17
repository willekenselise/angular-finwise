import { Component } from '@angular/core';
import { Expense } from '../../models/expense';
import { Router } from '@angular/router';
import { ExpensesService } from '../../services/expenses.service';

@Component({
  selector: 'app-total',
  templateUrl: './total.component.html',
  styleUrl: './total.component.scss',
})
export class TotalComponent {
  totalDebits: number = 0;
  totalCredits: number = 0;
  total: number = 0;
  expenses: Expense[] = [];
  constructor(
    private expensesService: ExpensesService
  ) {}

  ngOnInit(): void {
    this.expensesService.getExpensesByUserId().subscribe((expenses) => {
      this.expenses = expenses;
      this.calculateTotals();
    });
  }

  calculateTotals(): void {
    this.totalDebits = this.expenses
      .filter((expense) => expense.transactionNature === 'débit')
      .reduce((total, expense) => total + expense.amount, 0);

    this.totalCredits = this.expenses
      .filter((expense) => expense.transactionNature === 'crédit')
      .reduce((total, expense) => total + expense.amount, 0);

    this.total = this.totalCredits - this.totalDebits;
  }
}
