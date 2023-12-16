import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { Expense } from '../models/expense';
import { ExpensesService } from '../services/expenses.service';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  firstThreeCategories$: any;
  tabColor = ['#b871ffb1', '#ee7fab9c', "#edb949c9"]

  constructor(
    private expensesService: ExpensesService,
    private categoriesService: CategoriesService,
    private router: Router
  ) {}

  latestFiveExpenses: Expense[] = [];
  firstThreeCategories: { name: string; totalAmount: number }[] = [];
  totalAmount = 0;

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

  getTotalAmountByCategory(): void {
    const MAX_CATEGORIES = 3;
    this.categoriesService.getAllCategories().subscribe((categories: Category[]) => {
      let count = 0;
      categories.forEach((category) => {
        this.expensesService
          .getExpensesByCategoryAndUser(category.uid)
          .subscribe((totalAmount: number) => {
            if (totalAmount > 0) {
              this.firstThreeCategories.push({
                name: category.name,
                totalAmount,
              });
              count++;
              if (count >= MAX_CATEGORIES) {
                return;
              }
            }
          });
      });
    });
  }
  

  navigateToCategories(): void {
    this.router.navigate(['/categories']);
  }

  navigateToExpenses(): void {
    this.router.navigate(['/expenses']);
  }

}
