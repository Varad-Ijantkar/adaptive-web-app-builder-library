// import { Component } from '@angular/core';

// @Component({
  // selector: 'app-nav-bar',
  // standalone: true,
  // imports: [],
  // templateUrl: './nav-bar.component.html',
  // styleUrl: './nav-bar.component.css'
// })
// export class NavBarComponent {

// }


import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  // added : 
  isRotated = false;

  constructor() {
    // Set default theme to light
    document.documentElement.setAttribute('data-theme', 'light');
  }

  toggle_theme(): void {
    const currentTheme = document.documentElement.getAttribute('data-theme');

    if (currentTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light')
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark')
    }

    // Toggle Rotation
    this.isRotated = !this.isRotated;
  }
}
