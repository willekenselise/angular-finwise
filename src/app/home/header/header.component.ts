import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UsersService } from '../../services/users.service';
import { DarkModeService } from '../../services/dark-mode.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  fullName: string | undefined;
  isDarkMode$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UsersService,
    private darkModeService: DarkModeService
  ) {
    this.isDarkMode$ = this.darkModeService.darkMode$ || of(false)!;
  }

  isAuthenticated: boolean = false;

  ngOnInit() {
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
