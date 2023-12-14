import { Component, OnInit } from '@angular/core';
import { Expense } from '../../models/expense';
import { ExpensesService } from '../../services/expenses.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-expense',
  templateUrl: './list-expense.component.html',
  styleUrl: './list-expense.component.scss'
})
export class ListExpenseComponent implements OnInit {
  
    constructor(
      private router: Router,
      private expensesService: ExpensesService,
    ) {}

    expenses: Expense[] = [];
  
    ngOnInit(): void {
      this.expensesService.getAllExpenses().subscribe((expenses) => {
        this.expenses = expenses;
      });
    }

    navigateToAddExpense(): void {
      this.router.navigate(['add-expense']);
    }

}
