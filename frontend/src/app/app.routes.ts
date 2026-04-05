import { Routes } from '@angular/router';
import { TaskListComponent } from './pages/task-list.component';
import { TaskAddComponent } from './pages/task-add.component';

export const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: 'tasks', component: TaskListComponent },
  { path: 'add', component: TaskAddComponent }
];