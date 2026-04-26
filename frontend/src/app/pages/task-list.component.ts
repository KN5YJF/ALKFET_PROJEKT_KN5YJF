import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { TaskItem } from '../task.model';
import { ToastService } from '../toast/toast.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent implements OnInit {
  tasks: TaskItem[] = [];
  pagedTasks: TaskItem[] = [];
  currentPage = 1;
  pageSize = 5;
  totalPages = 1;
  deletingIds = new Set<string>();  //törlés hibakezeléshez

  constructor(
    private taskService: TaskService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.totalPages = Math.max(1, Math.ceil(this.tasks.length / this.pageSize));
        if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;
        this.updatePagedTasks();
      },
      error: () => this.toastService.show('Hiba! Nem sikerült betölteni a feladatokat. Kéréek, próbáld meg ismét.')
    });
  }

  updatePagedTasks(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    this.pagedTasks = this.tasks.slice(start, start + this.pageSize);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) { this.currentPage++; this.updatePagedTasks(); }
  }

  prevPage(): void {
    if (this.currentPage > 1) { this.currentPage--; this.updatePagedTasks(); }
  }

deleteTask(id: string): void {
  if (this.deletingIds.has(id)) return; // Dupla hívás hiba
  this.deletingIds.add(id);

  this.taskService.deleteTask(id).subscribe({
    next: () => {
      this.deletingIds.delete(id);
      this.toastService.show('Feladat sikeresen törölve!');
      this.loadTasks();
    },
    error: () => {
      this.deletingIds.delete(id);
      this.toastService.show('Hiba! A feladat törlése nem sikerült.');
      this.loadTasks();
    }
  });
}

  toggleTask(task: TaskItem): void {
    this.taskService.updateTask({ ...task, isCompleted: !task.isCompleted }).subscribe({
      next: () => this.loadTasks(),
      error: () => this.toastService.show('Hiba! Az állapot frissítése sikertelen!')
    });
  }
}