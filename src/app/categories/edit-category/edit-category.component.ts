import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '../../services/categories.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../models/category';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['../add-category/add-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  categoryForm: FormGroup;
  category: Category | undefined;
  categoryId: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoriesService: CategoriesService,
    private formBuilder: FormBuilder
  ) {
    this.categoryForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('id');
    if (this.categoryId) {
      this.categoriesService.getCategoryById(this.categoryId).subscribe((category: Category) => {
        this.categoryForm.patchValue({
          name: category.name,
        });
        this.category = category;
      });
    }
  }

  updateCategory(): void {
    if (this.category && this.categoryId) {
      const updatedCategory: Category = {
        uid: this.categoryId,
        name: this.categoryForm.value.name,
        updatedAt: new Date(),
        createdAt: this.category.createdAt
      };

      this.categoriesService.updateCategory(updatedCategory);
      this.router.navigate(['categories']);
    }
  }
}
