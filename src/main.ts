import 'zone.js/dist/zone';
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { signal } from './signals/signal';
import { computed } from './signals/computed';
import { effect } from './signals/effect';


@Component({
  selector: 'my-app',
  standalone: true,
  template: `
    <div>Count: {{ count() }}</div>
    <div>Double: {{ double() }}</div>

    <button (click)="inc()">Increase</button>
    <button (click)="reset()">Reset</button>

    <br>
    <!-- <test-arrays /> -->
    <!-- <test-objects /> -->

  `,
})
export class App {
  count = signal(0);

  double = computed(() => this.count() * 2);

  countType = computed(() => (this.count() % 2 === 0 ? 'even' : 'odd'));

  constructor() {
    effect(() => {
      console.log('Count changed', this.count());
      console.log(this.count(), 'is', this.countType());
    });
  }

  inc() {
    this.count.update((c) => c + 1);
  }

  reset() {
    this.count.set(0);
  }
}

bootstrapApplication(App);
