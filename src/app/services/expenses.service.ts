import { Injectable } from '@angular/core';
import { Expense } from '../models/expense';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  constructor() { }

  private expenses: Expense[] = [];


  getAllExpenses(): Expense[] {
    return this.expenses;
  }

  getExpenseById(id: string): Expense | undefined {
    return this.expenses.find((expense) => expense.id === id);
  }

  addExpense(expense: Expense): void {
    this.expenses.push(expense);
  }

  updateExpense(expense: Expense): void {
    const index = this.expenses.findIndex((e) => e.id === expense.id);
    this.expenses[index] = expense;
  }

  deleteExpense(expense: Expense): void {
    const index = this.expenses.indexOf(expense);
    this.expenses.splice(index, 1);
  }


}
