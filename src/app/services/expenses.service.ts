import { Injectable } from '@angular/core';
import { Expense } from '../models/expense';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  private expensesCollection: AngularFirestoreCollection<Expense>;
  expenses: Observable<Expense[]>;

  constructor(
    private readonly firestore: AngularFirestore,
    private authService: AuthService
  ) {
    this.expensesCollection = this.firestore.collection<Expense>('expenses');
    this.expenses = this.expensesCollection.valueChanges({
      idField: 'uid',
    });
  }

  getAllExpenses(): Observable<Expense[]> {
    return this.expenses;
  }

  getExpensesByUserId(userId: string): Observable<Expense[]> {
    return this.firestore
      .collection<Expense>('expenses', (ref) =>
        ref.where('userId', '==', userId)
      )
      .valueChanges({ idField: 'uid' });
  }

  addExpense(expense: Expense): Promise<Expense> {
    const newExpenseId = this.expensesCollection.ref.doc().id;

    const newExpense: Expense = {
      uid: newExpenseId,
      createdAt: expense.createdAt,
      updatedAt: expense.updatedAt,
      description: expense.description,
      amount: expense.amount,
      transactionDate: expense.transactionDate,
      transactionNature: expense.transactionNature,
      transactionName: expense.transactionName,
      categoryId: expense.categoryId,
      userId: this.authService.currentUser?.uid!,
    };
    return this.expensesCollection
      .doc(newExpenseId)
      .set(newExpense)
      .then(() => newExpense);
  }
}
