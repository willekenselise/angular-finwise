import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  tabColor = ['#b871ffb1', '#ee7fab9c', '#edb949c9'];
  firstThreeCategories: { cat: Category; totalAmount: string }[] = [];
  totalAmount = 0;

  constructor(
    private categoriesService: CategoriesService,
    private darkModeService: DarkModeService,
    private router: Router
  ) {
    this.isDarkMode$ = this.darkModeService.darkMode$ || of(false)!;
  }

  ngOnInit(): void {
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
