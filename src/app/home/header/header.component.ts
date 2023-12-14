import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
  ) {
   }
  
  isAuthenticated: boolean = false;

  ngOnInit(){
    // this.authService.currentAuthStatus$.subscribe((isAuthenticated) => {
    //   this.isAuthenticated = !!isAuthenticated;
    //   console.log(this.isAuthenticated);
    // })
    this.authService.getUserState.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
  }

  register() {
    this.router.navigate(['/register']);
  }

  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.router.navigate(['/logout']);
  }
}
