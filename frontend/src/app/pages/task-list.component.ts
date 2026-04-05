import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../task.service';
import { TaskItem } from '../task.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="background: #f4f4f4; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
      <h2 style="text-align: center; color: #2c3e50;">Feladatlista</h2>

      <div *ngIf="pagedTasks.length > 0; else noTasks">
        <ul style="list-style: none; padding: 0;">
          <li *ngFor="let task of pagedTasks"
              style="background: white; margin-bottom: 10px; padding: 12px; border-radius: 5px; display: flex; justify-content: space-between; align-items: center; border-left: 5px solid #3498db;">
            
            <div style="display: flex; align-items: center; gap: 12px;">
              <input
                type="checkbox"
                [checked]="task.isCompleted"
                (change)="toggleTask(task)"
              />

              <span
                [style.text-decoration]="task.isCompleted ? 'line-through' : 'none'"
                [style.color]="task.isCompleted ? '#7f8c8d' : '#2c3e50'">
                {{ task.title }}
              </span>
            </div>

            <button
              (click)="deleteTask(task.id!)"
              style="background: #e74c3c; color: white; border: none; border-radius: 4px; padding: 6px 10px; cursor: pointer;">
              Törlés
            </button>
          </li>
        </ul>

        <!-- Pagination -->
        <div style="display: flex; justify-content: center; gap: 10px; margin-top: 20px;">
          
          <button
            (click)="prevPage()"
            [disabled]="currentPage === 1"
            style="padding: 8px 12px; border: none; border-radius: 4px; cursor: pointer;">
            Előző
          </button>

          <span style="padding: 8px 12px;">
            {{ currentPage }} / {{ totalPages }}
          </span>

          <button
            (click)="nextPage()"
            [disabled]="currentPage === totalPages"
            style="padding: 8px 12px; border: none; border-radius: 4px; cursor: pointer;">
            Következő
          </button>

        </div>
      </div>

      <ng-template #noTasks>
        <p style="text-align: center; color: #e67e22;">Nincsenek feladatok.</p>
      </ng-template>
    </div>
  `
})
export class TaskListComponent implements OnInit {

  tasks: TaskItem[] = [];
  pagedTasks: TaskItem[] = [];

  currentPage = 1;
  pageSize = 5;
  totalPages = 1;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.totalPages = Math.max(1, Math.ceil(this.tasks.length / this.pageSize));

        if (this.currentPage > this.totalPages) {
          this.currentPage = this.totalPages;
        }

        this.updatePagedTasks();
      },
      error: (err) => console.error('Hiba betöltéskor:', err)
    });
  }

  updatePagedTasks(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedTasks = this.tasks.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagedTasks();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedTasks();
    }
  }

  deleteTask(id: string): void {
    this.taskService.deleteTask(id).subscribe({
      next: () => this.loadTasks(),
      error: (err) => console.error('Hiba törlésnél:', err)
    });
  }

  toggleTask(task: TaskItem): void {
    const updatedTask: TaskItem = {
      ...task,
      isCompleted: !task.isCompleted
    };

    this.taskService.updateTask(updatedTask).subscribe({
      next: () => this.loadTasks(),
      error: (err) => console.error('Hiba frissítésnél:', err)
    });
  }
}