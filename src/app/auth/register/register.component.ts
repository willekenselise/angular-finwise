import { Component } from '@angular/core';
import { FormGroup, Validators, NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  hide = true;
  registerForm!: FormGroup;
  
  constructor(
    private formBuilder: NonNullableFormBuilder,
    private authService: AuthService,
    private usersService: UsersService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }
  
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  register() {
    if (this.registerForm.value.password && this.registerForm.value.confirmPassword && this.registerForm.value.password !== this.registerForm.value.confirmPassword) {
      this.snackBar.open('Passwords do not match', 'OK', { duration: 5000 });
      return;
    }
    if (this.registerForm.invalid) {
      this.snackBar.open('Please fill the empty fields', 'OK', { duration: 5000 });
      return;
    }

    this.authService.SignUp({
      email: this.registerForm.value.email, 
      password: this.registerForm.value.password,
    }).pipe(
      switchMap(({user: {uid} }) =>
        this.usersService.addUser({
          uid, 
          email : this.registerForm.value.email, 
          firstName : this.registerForm.value.firstName, 
          lastName : this.registerForm.value.lastName
        })
      )
    ).subscribe({
      next: () => this.router.navigate(['/']),
      error: error => {
        this.snackBar.open(error.message, 'OK', { duration: 5000 });
      }
    });
  }
}
