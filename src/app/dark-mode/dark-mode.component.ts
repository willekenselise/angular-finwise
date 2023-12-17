import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DarkModeService } from '../services/dark-mode.service';


@Component({
  selector: 'app-dark-mode',
  templateUrl: './dark-mode.component.html',
  styleUrl: './dark-mode.component.scss'
})
export class DarkModeComponent {
  @Input() isDarkMode: boolean | null = false;
  @Output() darkModeToggled = new EventEmitter<void>();

  constructor(private darkModeService: DarkModeService) {}

  toggleDarkMode() {
    this.darkModeToggled.emit();
  }
}
