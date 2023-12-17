import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  constructor(
    private authService: AuthService,
    private fb: FormBuilder, 
    private route: ActivatedRoute, 
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  frmSetNewPassword = this.fb.group({
    newPassword: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]]
  });

  hide = false;
  
  setPassword() {
    const actionCode = this.route.snapshot.queryParams['oobCode'];
    const newPassword = this.frmSetNewPassword.controls['newPassword'].value;
    const confirmPassword = this.frmSetNewPassword.controls['confirmPassword'].value;

    if (newPassword !== confirmPassword) {
      this.snackBar.open('Passwords do not match', 'OK', { duration: 5000 });
    }
    else{
      this.authService.confirmPasswordReset(actionCode, newPassword?? '').subscribe(
        () => {
          this.snackBar.open('Password changed successfully', 'OK', { duration: 5000 });
          this.router.navigate(['/login']);
        },
        (error) => {
          this.snackBar.open(error.message, 'OK', { duration: 5000 });
        }
      );
    }
  }

}
