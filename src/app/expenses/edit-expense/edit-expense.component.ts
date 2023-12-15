import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpensesService } from '../../services/expenses.service';
import { Expense } from '../../models/expense';
import { Category } from '../../models/category';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.component.html',
  styleUrl: './edit-expense.component.scss',
})
export class EditExpenseComponent implements OnInit {
  expenseForm: FormGroup;
  expense: Expense | undefined;
  expenseId: string | null = null;
  categories: Category[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private expensesService: ExpensesService,
    private formBuilder: FormBuilder
  ) {
    this.expenseForm = this.formBuilder.group({
      description: ['', Validators.required],
      amount: ['', Validators.required],
      transactionDate: ['', Validators.required],
      transactionNature: ['', Validators.required],
      transactionName: ['', Validators.required],
      categoryId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.categoriesService.getAllCategories().subscribe((categories) => {
      this.categories = categories;
    });

    this.expenseId = this.route.snapshot.paramMap.get('id');
    if (this.expenseId) {
      this.expensesService
        .getExpenseById(this.expenseId)
        .subscribe((expense: Expense) => {
          this.expenseForm.patchValue({
            description: expense.description,
            amount: expense.amount,
            transactionDate: expense.transactionDate,
            transactionNature: expense.transactionNature,
            transactionName: expense.transactionName,
            categoryId: expense.categoryId,
          });
          this.expense = expense;
        });
    }
  }

  updateExpense(): void {
    if (this.expense && this.expenseId) {
      const updatedExpense: Expense = {
        uid: this.expenseId,
        createdAt: this.expense.createdAt,
        updatedAt: new Date(),
        description: this.expenseForm.value.description,
        amount: this.expenseForm.value.amount,
        transactionDate: this.expenseForm.value.transactionDate,
        transactionNature: this.expenseForm.value.transactionNature as
          | 'crédit'
          | 'débit',
        transactionName: this.expenseForm.value.transactionName,
        categoryId: this.expenseForm.value.categoryId,
        userId: this.expense.userId,
      };

      this.expensesService.updateExpense(updatedExpense);
      this.router.navigate(['expenses']);
    }
  }
}
