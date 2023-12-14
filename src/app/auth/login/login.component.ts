import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first, switchMap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm! : FormGroup;
  hide = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  login(): void {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.authService.signIn({ email, password }).pipe(
      switchMap(() => this.authService.getUserState.pipe(first()))
    ).subscribe({
      next: (user) => {
        if (user) {
          this.router.navigate(['profile']);
        } else {
          this.snackBar.open('Authentication failed', 'OK', { duration: 5000 });
        }
      },
      error: (error) => {
        this.snackBar.open(error.message, 'OK', { duration: 5000 });
      },
    });
  }
}
