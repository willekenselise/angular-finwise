import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotifService } from '../../services/notif.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private notifService: NotifService
  ) {
   }
  
  isAuthenticated: boolean = false;

  ngOnInit(){
    this.authService.currentAuthStatus.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
      console.log(this.isAuthenticated);
    })
  }

  register() {
    this.router.navigate(['/register']);
  }

  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.authService.signOut().subscribe({
      next: () => this.router.navigate(['/login']),
      error: (error: { message: string; }) => {
        console.error(error);
        this.snackBar.open(error.message, 'OK', { duration: 5000 });
      }
    });
  }
}
