import { Component } from '@angular/core';
import { ExpensesService } from '../../services/expenses.service';
import { Expense } from '../../models/expense';

@Component({
  selector: 'app-expense-graph',
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.scss',
})
export class GraphComponent {
  constructor(private expensesService: ExpensesService) {}

  expenses: Expense[] = [];
  totalDebits: number = 0;
  totalCredits: number = 0;
  total: number = 0;

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

  getCircleColor(transactionNature: 'débit' | 'crédit'): string {
    return transactionNature === 'débit' ? '#FF6384' : '#36A2EB';
  }

  getDashArray(transactionNature: 'débit' | 'crédit'): string | null {
    const total =
      transactionNature === 'débit' ? this.totalDebits : this.totalCredits;
    const circumference = 2 * Math.PI * 90;
    const dashLength =
      (total / (this.totalDebits + this.totalCredits)) * circumference;
    const gapLength = circumference - dashLength;

    return dashLength > 0 ? `${dashLength} ${gapLength}` : null;
  }
}
