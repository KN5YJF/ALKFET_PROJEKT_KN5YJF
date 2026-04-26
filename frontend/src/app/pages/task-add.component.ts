import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TaskService } from '../task.service';
import { TaskItem } from '../task.model';
import { ToastService } from '../toast/toast.service';

@Component({
  selector: 'app-task-add',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './task-add.component.html',
  styleUrl: './task-add.component.scss'
})
export class TaskAddComponent {
  newTaskTitle = '';

  constructor(
    private taskService: TaskService,
    private toastService: ToastService,
    private router: Router
  ) {}

  addTask(): void {
    if (!this.newTaskTitle.trim()) {
      this.toastService.show('A feladat címe nem lehet üres!');
      return;
    }

    const newTask: TaskItem = { title: this.newTaskTitle.trim(), isCompleted: false };

    this.taskService.addTask(newTask).subscribe({
      next: () => {
        this.toastService.show('Feladat sikeresen mentve!', 'success');
        this.newTaskTitle = '';
        this.router.navigate(['/tasks']);
      },
      error: () => this.toastService.show('Hiba: a feladat mentése nem sikerült.')
    });
  }
}
