import { Component, Input, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models/category';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DarkModeService } from '../../services/dark-mode.service';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrl: './list-category.component.scss',
})
export class ListCategoryComponent implements OnInit {
  constructor(
    private router: Router,
    private darkModeService: DarkModeService,
    private categoriesService: CategoriesService,
  ) {
    this.isDarkMode$ = this.darkModeService.darkMode$ || of(false)!;
  }

  @Input() categoriesDisplay: Category[] = [];

  categories: { cat: Category; totalAmount: string }[] = [];
  borderColors: string[] = [];
  isAddCategoryVisible = false
  isDarkMode$: Observable<boolean>;


  ngOnInit(): void {
    this.categoriesService.getAllCategories().subscribe((categories: Category[]) => {
      this.categoriesService.getTotalAmountByCategory(categories.length).then((obj) => {
        this.categories = obj;
      });
    });
  }



  toggleAddCategoryVisibility(): void {
    this.isAddCategoryVisible = !this.isAddCategoryVisible;
  }
  
  toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
  }

  deleteCategory(category: Category): void {
    const confirmation = window.confirm('Veut tu supprimer cette catégorie? Les dépenses associées seront supprimées aussi');
    
    if (confirmation) {
      this.categoriesService.deleteCategory(category)
    }
  }

  navigateToEditCategory(category: Category): void {
    this.router.navigate(['edit-category', category.uid]);
  }

  navigateToCategorySingle(categoryId: string): void {
    this.router.navigate(['/categories', categoryId]);
  }
}
