import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private router: Router) { }

  navigateToCategories(): void {
    this.router.navigate(['/categories']);
  }

  navigateToExpenses(): void {
    this.router.navigate(['/expenses']);
  }

}
