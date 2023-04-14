import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { signal } from './signals';

let userId = 0;
const uuid = () => ++userId;

export interface User {
  id: number;
  name: string;
}

@Component({
  selector: 'test-arrays',
  template: `
    <input #nameRef placeholder="Name">
    <button (click)="addUser(nameRef.value); nameRef.value = ''">Add</button>
    <button (click)="removeAll()" style="border: 1px solid red">Remove All</button>
    
    <br>

    <ul>
      <li *ngFor="let user of users()" >
        <span> {{ user.name }} </span>
        <button (click)="removeUser(user.id)">remove</button>
      </li>
    </ul>
  `,
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestArraysCmp {
  users = signal<User[]>([]);

  addUser(name: string) {
    this.users.update((users) => {
      const user: User = { id: uuid(), name };
      // mutable update also works!
      // users.push(user); return users;
      return [...users, user];
    });
  }

  removeUser(id: number) {
    this.users.update((users) => users.filter((u) => u.id !== id));
  }

  removeAll() {
    this.users.set([]);
  }
}
