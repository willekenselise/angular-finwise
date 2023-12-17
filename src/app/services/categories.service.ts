import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable, take } from 'rxjs';
import { ExpensesService } from './expenses.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private catagoriesCollection: AngularFirestoreCollection<Category>;
  categories: Observable<Category[]>;

  constructor(
    private expensesService: ExpensesService,
    private readonly firestore: AngularFirestore) 
    {
    this.catagoriesCollection =
      this.firestore.collection<Category>('categories');
    this.categories = this.catagoriesCollection.valueChanges({
      idField: 'uid',
    });
  }

  getAllCategories(): Observable<Category[]> {
    return this.categories;
  }

  getCategoryById(categoryId: string): Observable<Category> {
    return this.catagoriesCollection
      .doc<Category>(categoryId)
      .valueChanges() as Observable<Category>;
  }

  addCategory(category: Category): Promise<Category> {
    const newCategoryId = this.catagoriesCollection.ref.doc().id;
    const newCategory: Category = {
      uid: newCategoryId,
      name: category.name,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };
    return this.catagoriesCollection
      .doc(newCategoryId)
      .set(newCategory)
      .then(() => newCategory);
  }

  deleteCategory(category: Category): Promise<void> {
    return this.catagoriesCollection.doc(category.uid).delete();
  }

  updateCategory(category: Category): Promise<void> {
    return this.catagoriesCollection.doc(category.uid).update(category);
  }

  getTotalAmountByCategory(maxCategories: number): Promise<{ cat: Category; totalAmount: string }[]> {
    return new Promise<{ cat: Category; totalAmount: string }[]>((resolve) => {
      let categoriesSelected: { cat: Category; totalAmount: string }[] = [];
      const subscription = this.getAllCategories().subscribe((categories: Category[]) => {
        let count = 0;
        categories.forEach((category) => {
          this.expensesService
            .getExpensesByCategoryAndUser(category.uid)
            .pipe(take(1)) 
            .subscribe((totalAmount: string) => {
              if (count < maxCategories) {
                categoriesSelected.push({
                  cat: category,
                  totalAmount,
                });
                count++;
              }
              if (count === maxCategories) {
                subscription.unsubscribe(); 
                resolve(categoriesSelected);
              }
            });
        });
      });
    });
  }
   



}
