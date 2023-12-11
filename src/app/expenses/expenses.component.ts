import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpensesService } from '../services/expenses.service';
import { Expense } from '../models/expense';
import { FormGroup, Validators, NonNullableFormBuilder, FormsModule } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './expenses.component.html',
  styleUrl: './expenses.component.scss',
})
export class ExpensesComponent implements OnInit {
  expenses: Expense[] = [];
  showForm = false;
  expenseForm!: FormGroup;
  userId: string | null = null;

  constructor(
    private expensesService: ExpensesService,
    private formBuilder: NonNullableFormBuilder,
    private fireAuth: AngularFireAuth 
  ) {}

  ngOnInit(): void {
    this.fireAuth.authState.subscribe((user) => {
      this.userId = user ? user.uid : null;
    });
    this.expenses = this.expensesService.getAllExpenses();
    this.expenseForm = this.formBuilder.group({
      description: ['', Validators.required],
      amount: [null, [Validators.required, Validators.min(0)]],
      date: [null, Validators.required],
      userId: [this.userId, Validators.required],
    });
  }

  deleteExpense(expense: Expense): void {
    this.expensesService.deleteExpense(expense);
  }

  addExpense(): void {
    if (this.expenseForm.valid) {
      const newExpense: Expense = {
        description: this.expenseForm.value.description,
        amount: this.expenseForm.value.amount,
        date: this.expenseForm.value.date,
        userId:  this.userId!,
      };
      this.expensesService.addExpense(newExpense);
      this.expenseForm.reset();
    }
  }

  editExpense(expense: Expense): void {
    this.expensesService.updateExpense(expense);
  }

  showAddExpenseForm(): void {
    this.expenseForm.reset();
  }
}
