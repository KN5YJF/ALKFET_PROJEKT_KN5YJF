import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <div style="max-width: 900px; margin: 30px auto; font-family: Arial, sans-serif;">
      <h1 style="text-align: center; color: #2c3e50;">Task Manager</h1>

      <nav style="display: flex; gap: 10px; justify-content: center; margin-bottom: 20px;">
        <a
          routerLink="/tasks"
          style="padding: 10px 16px; background: #3498db; color: white; text-decoration: none; border-radius: 6px;">
          Feladatok
        </a>

        <a
          routerLink="/add"
          style="padding: 10px 16px; background: #27ae60; color: white; text-decoration: none; border-radius: 6px;">
          Új feladat
        </a>
      </nav>

      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {}