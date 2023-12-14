import { Injectable } from '@angular/core';
import { Expense } from '../models/expense';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class ExpensesService {
  private expensesCollection: AngularFirestoreCollection<Expense>;
  expenses: Observable<Expense[]>;
  userId: string | null = null;

  constructor(
    private readonly firestore: AngularFirestore,
    private fireAuth: AngularFireAuth
  ) {
    this.expensesCollection = this.firestore.collection<Expense>('expenses');
    this.expenses = this.expensesCollection.valueChanges({
      idField: 'uid',
    });
  }

   


  getAllExpenses(): Observable<Expense[]> {
    return this.expenses;
  }

  addExpense(expense: Expense): Promise<Expense> {
    this.fireAuth.authState.subscribe((user) => {
      console.log('user', user);
      this.userId = user ? user.uid : '';
    });
    const newExpense: Expense = {
      uid: this.expensesCollection.ref.doc().id,
      createdAt: expense.createdAt,
      updatedAt: expense.updatedAt,
      description: expense.description,
      amount: expense.amount,
      transactionDate: expense.transactionDate,
      transactionNature: expense.transactionNature,
      transactionName: expense.transactionName,
      categoryId: expense.categoryId,
      userId: this.userId!
    };

    console.log(newExpense);
    return this.expensesCollection.add(newExpense).then(() => newExpense);
  }
}
