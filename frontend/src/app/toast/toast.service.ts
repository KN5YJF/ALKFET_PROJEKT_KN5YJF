import { Injectable, signal } from '@angular/core';

export interface Toast {
  message: string;
  type: 'error' | 'success';
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  toast = signal<Toast | null>(null);

  private timer: ReturnType<typeof setTimeout> | null = null;

  show(message: string, type: 'error' | 'success' = 'error'): void {
    if (this.timer) clearTimeout(this.timer);
    this.toast.set({ message, type });
    this.timer = setTimeout(() => this.toast.set(null), 3500);
  }

  dismiss(): void {
    this.toast.set(null);
  }
}
