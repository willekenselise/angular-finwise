import { Component, Input, OnInit } from '@angular/core';
import { CategoriesService } from '../../services/categories.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Category } from '../../models/category';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrl: './list-category.component.scss',
})
export class ListCategoryComponent implements OnInit {
  constructor(
    private router: Router,
    private categoriesService: CategoriesService
  ) {}

  @Input() categoriesDisplay: Category[] = [];

  categories: { cat: Category; totalAmount: string }[] = [];
  tabColor = ['#b871ffb1', '#ee7fab9c', "#edb949c9"]
  isAddCategoryVisible = false


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

  deleteCategory(category: Category): void {
    this.categoriesService.deleteCategory(category);
  }

  navigateToEditCategory(category: Category): void {
    this.router.navigate(['edit-category', category.uid]);
  }

  getRandomColor(): string {
    const randomIndex = Math.floor(Math.random() * this.tabColor.length);
    return `0.5px solid ${this.tabColor[randomIndex]}`;
  }
}
