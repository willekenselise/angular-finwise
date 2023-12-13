import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs';
import { NotifService } from '../../services/notif.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm! : FormGroup;
  hide = true;

  //@Output() login = new EventEmitter<void>(

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private notifService: NotifService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  login() {
    this.authService.signIn({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    })
    //.pipe(finalize(() => ))
    .subscribe({
      next: (x) => {
        this.router.navigate(['/profile']);
        console.log("test", x);
      },
      error: error => {
        console.error(error);
        this.snackBar.open(error.message, 'OK', { duration: 5000 });
      }
    });
  }
}
