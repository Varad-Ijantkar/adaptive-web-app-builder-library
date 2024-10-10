import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeadbarComponent } from './headbar/headbar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NavmenuComponent } from './navmenu/navmenu.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  // template: `
  //             <app-headbar></app-headbar>
  //             <app-navbar></app-navbar>`,
  imports: [RouterOutlet, HeadbarComponent, NavbarComponent, NavmenuComponent, HomepageComponent, FooterComponent]
})
export class AppComponent {
  title = 'adaptive-web-app-builder';
} 