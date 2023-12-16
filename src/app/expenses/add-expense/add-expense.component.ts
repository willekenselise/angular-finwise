import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExpensesService } from '../../services/expenses.service';
import { Expense } from '../../models/expense';
import { Category } from '../../models/category';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.scss',
})
export class AddExpenseComponent implements OnInit{
  expenseForm: FormGroup;
  categories: Category[] = [];

  constructor(
    private router: Router,
    private categoriesService: CategoriesService,
    private expenesesService: ExpensesService,
    private formBuilder: FormBuilder
  ) {
    this.expenseForm = this.formBuilder.group({
      amount: ['', Validators.required],
      transactionNature: ['débit', Validators.required],
      transactionName: ['', Validators.required],
      description: ['', Validators.required],
      transactionDate: ['', Validators.required],
      categoryId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.categoriesService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  async addExpense(): Promise<void> {
    if (this.expenseForm.valid) {
      const newExpense: Expense = {
        uid: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        description: this.expenseForm.value.description,
        amount: this.expenseForm.value.amount,
        transactionDate: this.expenseForm.value.transactionDate,
        transactionNature: this.expenseForm.value.transactionNature as
          | 'crédit'
          | 'débit',
        transactionName: this.expenseForm.value.transactionName,
        categoryId: this.expenseForm.value.categoryId,
        userId: '',
      };
      try {
        await this.expenesesService.addExpense(newExpense);
        console.log('Expense added !');
        this.router.navigate(['expenses']);
      } catch (error) {
        this.expenseForm.reset();
        console.error('Error adding expense:', error);
      }
    }
  }
}
