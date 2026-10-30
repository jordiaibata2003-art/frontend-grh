import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NavbarComponent } from './components/navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent],
  templateUrl: './app.html',
})
export class App {
  title = 'frontend-grh';
  showNavbar = false;

  constructor(private router: Router) {
    this.update(this.router.url);
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((e) => this.update(e.urlAfterRedirects));
  }

  private update(url: string): void {
    const path = url.split('?')[0].split('#')[0];
    this.showNavbar = path !== '/' && path !== '' && !path.startsWith('/login');
  }
}