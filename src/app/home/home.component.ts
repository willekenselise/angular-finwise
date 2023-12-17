import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { Expense } from '../models/expense';
import { ExpensesService } from '../services/expenses.service';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';
import { Observable, of } from 'rxjs';
import { DarkModeService } from '../services/dark-mode.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  isDarkMode$: Observable<boolean>;
  firstThreeCategories$: any;
  tabColor = ['#b871ffb1', '#ee7fab9c', "#edb949c9"]
  latestFiveExpenses: Expense[] = [];
  firstThreeCategories: { cat: Category; totalAmount: string }[] = [];
  totalAmount = 0;

  constructor(
    private expensesService: ExpensesService,
    private categoriesService: CategoriesService,
    private darkModeService: DarkModeService,
    private router: Router
  ) {
    this.isDarkMode$ = this.darkModeService.darkMode$ || of(false)!; 
  }

  ngOnInit(): void {
    this.expensesService.getExpensesByUserId().subscribe((expenses: any[]) => {
      this.latestFiveExpenses = expenses
        .sort(
          (a, b) =>
            new Date(b.transactionDate).getTime() -
            new Date(a.transactionDate).getTime()
        )
        .slice(0, 5);
    });
    this.getTotalAmountByCategory();
  }

  async getTotalAmountByCategory(): Promise<void> {
    try {
      this.firstThreeCategories =
        await this.categoriesService.getTotalAmountByCategory(3);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }


  navigateToExpenseSingle(expenseId: string): void {
    this.router.navigate(['/expenses', expenseId]);
  }

  navigateToCategorySingle(categoryId: string): void {
    this.router.navigate(['/categories', categoryId]);
  }


  navigateToCategories(): void {
    this.router.navigate(['/categories']);
  }

  navigateToExpenses(): void {
    this.router.navigate(['/expenses']);
  }
}
