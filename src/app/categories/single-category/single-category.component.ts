import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '../../services/categories.service';
import { ExpensesService } from '../../services/expenses.service';
import { Category } from '../../models/category';
import { Expense } from '../../models/expense';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.scss'],
})
export class SingleCategoryComponent implements OnInit {
  category: Category | undefined;
  expenses: Expense[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoriesService: CategoriesService,
    private expensesService: ExpensesService
  ) {}

  ngOnInit(): void {
    this.loadCategory();
  }

  navigateToExpense(expense: Expense): void {
    this.router.navigate(['expenses', expense.uid]);
  }

  loadCategory(): void {
    const categoryId = this.route.snapshot.paramMap.get('id');

    if (categoryId) {
      this.categoriesService
        .getCategoryById(categoryId)
        .subscribe((category) => {
          this.category = category;

          this.expensesService
            .getExpensesByCategory(categoryId)
            .subscribe((expenses) => {
              this.expenses = expenses;
            });
        });
    }
  }
}
