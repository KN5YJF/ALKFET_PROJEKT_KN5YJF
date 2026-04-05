import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TaskService } from '../task.service';
import { TaskItem } from '../task.model';

@Component({
  selector: 'app-task-add',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div style="background: #f4f4f4; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); max-width: 500px; margin: auto;">
      <h2 style="text-align: center; color: #2c3e50;">Új feladat</h2>

      <div style="display: flex; flex-direction: column; gap: 12px;">
        <input
          [(ngModel)]="newTaskTitle"
          placeholder="Feladat címe"
          (keyup.enter)="addTask()"
          style="padding: 10px; border: 1px solid #ccc; border-radius: 6px;"
        />

        <button
          (click)="addTask()"
          style="padding: 10px; background: #27ae60; color: white; border: none; border-radius: 6px; cursor: pointer;">
          Mentés
        </button>

        <a
          routerLink="/tasks"
          style="text-align: center; text-decoration: none; color: #3498db;">
          Vissza a listához
        </a>
      </div>
    </div>
  `
})
export class TaskAddComponent {
  newTaskTitle = '';

  constructor(
    private taskService: TaskService,
    private router: Router
  ) {}

  addTask(): void {
    if (!this.newTaskTitle.trim()) {
      return;
    }

    const newTask: TaskItem = {
      title: this.newTaskTitle.trim(),
      isCompleted: false
    };

    this.taskService.addTask(newTask).subscribe({
      next: () => {
        this.newTaskTitle = '';
        this.router.navigate(['/tasks']);
      },
      error: (err) => console.error('Hiba mentés közben:', err)
    });
  }
}