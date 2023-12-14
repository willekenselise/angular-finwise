import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private catagoriesCollection: AngularFirestoreCollection<Category>;
  categories: Observable<Category[]>;

  constructor(private readonly firestore: AngularFirestore) {
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
    return this.catagoriesCollection.doc<Category>(categoryId).valueChanges() as Observable<Category>;
  }

  addCategory(category: Category): Promise<Category> {
    const newCategory: Category = {
      uid: this.catagoriesCollection.ref.doc().id,
      name: category.name,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    };
    return this.catagoriesCollection.add(newCategory).then(() => newCategory);
  }

  deleteCategory(category: Category): Promise<void> {
    return this.catagoriesCollection.doc(category.uid).delete();
  }

  updateCategory(category: Category): Promise<void> {
    return this.catagoriesCollection.doc(category.uid).update(category);
  }
}
