import { Injectable } from '@angular/core';
import { Expense } from '../models/expense';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
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

  // getAllExpenses(): Observable<Expense[]> {
  //   return this.expenses;
  // }

  getExpensesByUserId(): Observable<Expense[]> {
    return this.expenses = this.firestore
      .collection<Expense>('expenses', (ref) =>
        ref.where('userId', '==', this.authService.currentUser?.uid!)
      )
      .valueChanges({ idField: 'uid' });
  }

  getExpenseById(expenseId: string): Observable<Expense> {
    return this.expensesCollection
      .doc<Expense>(expenseId)
      .valueChanges() as Observable<Expense>;
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

  updateExpense(expense: Expense): Promise<void> {
    return this.expensesCollection.doc(expense.uid).update(expense);
  }

  deleteExpense(expense: Expense): Promise<void> {
    return this.expensesCollection.doc(expense.uid).delete();
  }

  getExpensesByCategoryAndUser(categoryId: string): Observable<string> {
    return this.expenses.pipe(
      map((expenses: Expense[]) => {
        const filteredExpenses = expenses.filter((expense) =>
          expense.userId === this.authService.currentUser?.uid! &&
          expense.categoryId === categoryId
        );
  
        const totalAmount = filteredExpenses.reduce((total, expense) => {
          if (expense.transactionNature === 'débit') {
            return total - expense.amount;

          } else if (expense.transactionNature === 'crédit') {
            return total + expense.amount;
          } else {
            return total;
          }
        }, 0);
  
        return  totalAmount >= 0 ? `+ ${totalAmount}` : `- ${Math.abs(totalAmount)}`;
      })
    );
  }
  

}
