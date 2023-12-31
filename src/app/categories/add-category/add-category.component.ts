import { Component, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '../../services/categories.service';


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent {
  categoryForm: FormGroup;

  constructor(
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
        console.log('Category added !');
        this.categoryForm.reset();
      } catch (error) {
        this.categoryForm.reset();
        console.error('Error adding category:', error);
      }
    }
  }

}
