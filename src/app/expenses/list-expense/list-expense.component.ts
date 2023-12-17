import { Component, Input, OnInit } from '@angular/core';
import { Expense } from '../../models/expense';
import { ExpensesService } from '../../services/expenses.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-expense',
  templateUrl: './list-expense.component.html',
  styleUrl: './list-expense.component.scss',
})
export class ListExpenseComponent implements OnInit {
  constructor(
    private expensesService: ExpensesService
  ) {}

  @Input() expensesDisplay: Expense[] = [];

  expenses: Expense[] = [];
  isAddExpenseVisible = false;

  ngOnInit(): void {
    this.expensesService.getExpensesByUserId().subscribe((expenses) => {
      this.expenses = expenses.sort((a, b) => {
        const dateA = new Date(a.transactionDate).getTime();
        const dateB = new Date(b.transactionDate).getTime();
        return dateB - dateA;
      });
    });
  }

  toggleAddExpenseVisibility(): void {
    this.isAddExpenseVisible = !this.isAddExpenseVisible;
  }
}
