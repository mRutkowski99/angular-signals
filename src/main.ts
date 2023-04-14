import 'zone.js/dist/zone';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { signal } from './signals/signal';
import { computed } from './signals/computed';
import { effect } from './signals/effect';

class HistoryLog {
  readonly date: Date;

  constructor(public readonly reservations: number) {
    this.date = new Date();
  }
}

@Component({
  selector: 'my-app',
  standalone: true,
  template: `
    <p>Reserved tickets: {{ counter() }}</p>
    <p>Will sales kick off: {{ willSalesKickOff() }}</p>

    <button [disabled]="isLimitReached()" (click)="increment()">Increase</button>
    <button (click)="reset()">Reset</button>
    <button (click)="decrement()">Decrease</button>

    <br>
    
    <button (click)="logHistory()">Log history</button>

  `,
})
export class App implements OnInit {
  private readonly RESERVATIONS_MIN = 5;
  private readonly RESERVATIONS_MAX = 20;

  readonly counter = signal(0);
  readonly willSalesKickOff = computed(
    () => this.counter() >= this.RESERVATIONS_MIN
  );
  readonly isLimitReached = computed(
    () => this.counter() === this.RESERVATIONS_MAX
  );

  readonly history = signal<HistoryLog[]>([]);

  ngOnInit() {
    effect(() => {
      this.history.mutate((historyLogs) =>
        historyLogs.push(new HistoryLog(this.counter()))
      );
    });
  }

  increment() {
    this.counter.update((counter) => counter + 1);
  }

  decrement() {
    this.counter.update((counter) => (counter === 0 ? 0 : counter - 1));
  }

  reset() {
    this.counter.set(0);
    this.history.set([]);
  }

  logHistory() {
    console.log(this.history());
  }
}

bootstrapApplication(App);
