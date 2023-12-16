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
  firstThreeCategories: { cat: Category; totalAmount: string }[] = [];
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
    this.getTotalAmountByCategory()
  }


  async getTotalAmountByCategory(): Promise<void> {
    try {
      this.firstThreeCategories = await this.categoriesService.getTotalAmountByCategory(3);
      console.log(this.firstThreeCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }
  
  

  navigateToCategories(): void {
    this.router.navigate(['/categories']);
  }

  navigateToExpenses(): void {
    this.router.navigate(['/expenses']);
  }

}
