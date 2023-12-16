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
import { AuthGuard } from './services/guards/auth.guard';
import { LogoutComponent } from './auth/logout/logout.component';
import { EditExpenseComponent } from './expenses/edit-expense/edit-expense.component';
import { SingleCategoryComponent } from './categories/single-category/single-category.component';
import { SingleExpenseComponent } from './expenses/single-expense/single-expense.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]

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
    canActivate: [AuthGuard],
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
    canActivate: [AuthGuard]

  },
  {
    path: 'categories/:id',
    component: SingleCategoryComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'expenses/:id',
    component: SingleExpenseComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'add-category',
    component: AddCategoryComponent,
    canActivate: [AuthGuard]

  },
  { path: 'edit-category/:id',
   component: EditCategoryComponent,
   canActivate: [AuthGuard]

  },
  {
    path: 'expenses',
    component: ListExpenseComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'add-expense',
    component: AddExpenseComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-expense/:id',
    component: EditExpenseComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
