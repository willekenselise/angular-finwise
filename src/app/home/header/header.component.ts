import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  fullName: string | undefined;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UsersService
  ) {}

  isAuthenticated: boolean = false;

  ngOnInit() {
    // this.authService.currentAuthStatus$.subscribe((isAuthenticated) => {
    //   this.isAuthenticated = !!isAuthenticated;
    //   console.log(this.isAuthenticated);
    // })
    this.authService.getUserState.subscribe((user) => {
      this.isAuthenticated = !!user;
    });

    this.userService.getUser().subscribe((user) => {
      this.fullName = user || 'Profile';
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
