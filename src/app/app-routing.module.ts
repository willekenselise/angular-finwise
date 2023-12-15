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
import { ProfileComponent } from './profile/profile.component';
import { authGuard } from './services/guards/auth.guard';
import { LogoutComponent } from './auth/logout/logout.component';
import { EditExpenseComponent } from './expenses/edit-expense/edit-expense.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuard]

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
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard],
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'logout',
    component: LogoutComponent,
    // canActivate: [authGuard],
    // runGuardsAndResolvers: 'always'
  },
  {
    path: 'categories',
    component: ListCategoryComponent,
    canActivate: [authGuard]

  },
  {
    path: 'add-category',
    component: AddCategoryComponent,
    canActivate: [authGuard]

  },
  { path: 'edit-category/:id',
   component: EditCategoryComponent,
   canActivate: [authGuard]

  },
  {
    path: 'expenses',
    component: ListExpenseComponent,
    canActivate: [authGuard]

  },
  {
    path: 'add-expense',
    component: AddExpenseComponent,
    canActivate: [authGuard]
  },
  {
    path: 'edit-expense/:id',
    component: EditExpenseComponent,
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
