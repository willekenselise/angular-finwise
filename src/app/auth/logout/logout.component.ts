import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,

  ) {}
  
  ngOnInit(){
    this.signOut();
  }

  signOut() {
    this.authService.signOut().subscribe({
      next: () => this.router.navigate(['/login']),
      error: (error: { message: string; }) => {
        this.snackBar.open(error.message, 'OK', { duration: 5000 });
      }
    });
  }
}
