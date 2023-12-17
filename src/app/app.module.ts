import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import{ FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';

// Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';

// Components
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { HeaderComponent } from './home/header/header.component';
import { ProfileComponent } from './account/profile/profile.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { AddCategoryComponent } from './categories/add-category/add-category.component';
import { EditCategoryComponent } from './categories/edit-category/edit-category.component';
import { ListExpenseComponent } from './expenses/list-expense/list-expense.component';
import { AddExpenseComponent } from './expenses/add-expense/add-expense.component';
import { ListCategoryComponent } from './categories/list-category/list-category.component';
import { EditExpenseComponent } from './expenses/edit-expense/edit-expense.component';
import { HomeComponent } from './home/home.component';
import { MatCardModule } from '@angular/material/card';
import { SingleCategoryComponent } from './categories/single-category/single-category.component';
import { SingleExpenseComponent } from './expenses/single-expense/single-expense.component';
import { TotalComponent } from './expenses/total/total.component';
import { ResetPasswordComponent } from './account/reset-password/reset-password.component';
import { FrenchDatePipe } from './pipes/french-date.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HeaderComponent,
    ListCategoryComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    ListExpenseComponent,
    AddExpenseComponent,
    EditExpenseComponent,
    ProfileComponent,
    LogoutComponent,
    SingleCategoryComponent,
    SingleExpenseComponent,
    TotalComponent
    ResetPasswordComponent,
    FrenchDatePipe
  ],
  imports: [
    MatCardModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
