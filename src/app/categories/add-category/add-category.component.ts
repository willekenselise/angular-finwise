import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/categories';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '../../services/categories.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent {
  categoryForm: FormGroup;

  constructor(
    private router : Router,
    private categoriesService: CategoriesService,
    private formBuilder: FormBuilder
  ) {
    this.categoryForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  async addCategory() : Promise<void> {
    if(this.categoryForm.valid) {
      const newCategory: Category = {
        uid: '',
        name: this.categoryForm.value.name,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      try {
        await this.categoriesService.addCategory(newCategory);
        console.log('Expense added !');
        this.router.navigate(['categories']);
      } catch (error) {
        this.categoryForm.reset();
        console.error('Error adding category:', error);
      }
    }
  }

}
