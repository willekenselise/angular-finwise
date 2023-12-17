import { Component } from '@angular/core';
import { DarkModeService } from './services/dark-mode.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-finwise';

  isDarkMode$: Observable<boolean>;
  constructor(private darkModeService: DarkModeService) {
    this.isDarkMode$ = this.darkModeService.darkMode$ || of(false)!;
  }

  toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
  }
}
