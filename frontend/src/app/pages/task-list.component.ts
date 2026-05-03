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
  tasks: TaskItem[] = []; //feladat lista
  pagedTasks: TaskItem[] = []; //megjelenő feladatok
  currentPage = 1; //felület lapozás érétkei
  pageSize = 5;
  totalPages = 1;
  deletingIds = new Set<string>();  //törlés hibakezelés, többes kattintás probléma

  constructor(
    private taskService: TaskService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadTasks();
  }
//faladat betöltés api-ból. optimális válasz esetén lapozés és lista frissítés
  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.totalPages = Math.max(1, Math.ceil(this.tasks.length / this.pageSize));
        if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;
        this.updatePagedTasks();
      },
      error: () => this.toastService.show('Nem sikerült betölteni a feladatokat. Kérélek, próbáld meg ismét.')
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
//frontend listából töröl, majd a backenddel szinkron következik
deleteTask(id: string): void {
  if (this.deletingIds.has(id)) return;
  this.deletingIds.add(id);

// új tömb referencia. task megjelenés hiba kezelés
  this.tasks = [...this.tasks.filter(t => t.id !== id)];
  this.totalPages = Math.max(1, Math.ceil(this.tasks.length / this.pageSize));
  if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;
  this.updatePagedTasks();

  this.taskService.deleteTask(id).subscribe({
    next: () => {
      this.deletingIds.delete(id);
      this.toastService.show('Sikeres törölés!');
    },
    error: () => {
      this.deletingIds.delete(id);
      this.toastService.show('Hiba! A feladat törlése sikertelen');
      this.loadTasks();
    }
  });
}
//felhasználó visszajelzés az UI-ra
toggleTask(task: TaskItem): void {
  const previousValue = task.isCompleted;

  task.isCompleted = !task.isCompleted;

  this.taskService.updateTask(task).subscribe({
    next: () => {
      this.toastService.show('Feladat állapota frissítve!');
    },
    error: () => {
      task.isCompleted = previousValue;
      this.toastService.show('Hiba! Az állapot frissítése sikertelen!');
    }
  });
  }
}