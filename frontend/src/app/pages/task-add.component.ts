import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TaskService } from '../task.service';
import { TaskItem } from '../task.model';
import { ToastService } from '../toast/toast.service';

//kreálás, add
@Component({
  selector: 'app-task-add',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './task-add.component.html',
  styleUrl: './task-add.component.scss'
})
export class TaskAddComponent {

  //felhasználó badja a taskot
  newTaskTitle = '';

  constructor(
    private taskService: TaskService,
    private toastService: ToastService,
    private router: Router
  ) {}

  addTask(): void {

    //üres bevitel ellenőrzés
    if (!this.newTaskTitle.trim()) {
      this.toastService.show('A feladat címe nem lehet üres!');
      return;
    }

    //új objektum
    const newTask: TaskItem = {
      title: this.newTaskTitle.trim(),
      isCompleted: false
    };

    //backend API -nak küldés
    this.taskService.addTask(newTask).subscribe({
      next: () => {
        //sikeres bemenet, kijelző visszaállítáa
        this.toastService.show('Feladat sikeresen mentve!');
        this.newTaskTitle = '';

        //navigáció, task lista
        this.router.navigate(['/tasks']);
      },
      error: () => {
        //hibakezelés
        this.toastService.show('Hiba! A feladat mentése sikertelen.');
      }
    });
  }
}