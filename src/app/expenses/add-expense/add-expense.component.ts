import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ExpensesService } from '../../services/expenses.service';
import { Expense } from '../../models/expense';
import { Category } from '../../models/category';
import { CategoriesService } from '../../services/categories.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DarkModeService } from '../../services/dark-mode.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.scss',
})
export class AddExpenseComponent implements OnInit{
  expenseForm: FormGroup;
  isDarkMode$: Observable<boolean>;
  categories: Category[] = [];

  constructor(
    private router: Router,
    private categoriesService: CategoriesService,
    private expenesesService: ExpensesService,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private darkModeService: DarkModeService,
  ) {
    this.expenseForm = this.formBuilder.group({
      amount: ['', Validators.required],
      transactionNature: ['débit', Validators.required],
      transactionName: ['', Validators.required],
      description: ['', Validators.required],
      transactionDate: ['', Validators.required],
      categoryId: ['', Validators.required],
    });
    this.isDarkMode$ = this.darkModeService.darkMode$ || of(false)!;
  }

  ngOnInit(): void {
    this.categoriesService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  async addExpense(): Promise<void> {
    console.log('expenseForm', this.expenseForm)
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
        this.snackBar.open('Dépense ajouté', 'OK', {duration: 5000});
        this.expenseForm.reset();
        this.router.navigate(['expenses']);
      } catch (error) {
        this.expenseForm.reset();
        this.snackBar.open('Erreur dans l\'ajout', 'OK', {duration: 5000});
      }
    }
    else{
      this.snackBar.open('Formulaire invalide', 'OK', {duration: 5000});
    }
  }
}
