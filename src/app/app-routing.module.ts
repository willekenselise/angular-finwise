import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ListCategoryComponent } from './categories/list-category/list-category.component';
import { AddCategoryComponent } from './categories/add-category/add-category.component';
import { EditCategoryComponent } from './categories/edit-category/edit-category.component';
import { ListExpenseComponent } from './expenses/list-expense/list-expense.component';
import { AddExpenseComponent } from './expenses/add-expense/add-expense.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'categories',
    component: ListCategoryComponent,
  },
  {
    path: 'add-category',
    component: AddCategoryComponent,
  },
  { path: 'edit-category/:id',
   component: EditCategoryComponent
  },
  {
    path: 'expenses',
    component: ListExpenseComponent,
  },
  {
    path: 'add-expense',
    component: AddExpenseComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
