import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { signal } from './signals';

export interface UserData {
  name: string;
  age: number | null;
  tech: string | null;
  valid: boolean;
}

@Component({
  selector: 'test-objects',
  template: `

    <!-- We can use: change, keyup, keydown when listening for input changes -->

    <input 
      placeholder="Name" 
      [value]="userData().name"
      (keydown)="updateUser('name', $any($event.target).value)" 
    /> 

    <input 
      type="number"
      placeholder="Age" 
      [value]="userData().age"
      (keydown)="updateUser('age', $any($event.target).value)" 
    /> 

    <select 
      [value]="userData().tech" 
      (change)="updateUser('tech', $any($event.target).value)"
      placeholder="Select tech">

      <option></option>
      <option value="Angular">Angular</option>
      <option value="Solid">Solid</option>
      <option value="Vue">Vue</option>
    </select>

    <br>

    <label>
      <input 
        type="checkbox"
        [value]="userData().valid"
        (change)="updateUser('valid', $any($event.target).checked)" 
      /> 

      Valid
    </label>

    <button (click)="reset()">Reset</button>

    <br>

    {{ userData() | json }}
  `,
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestObjectsCmp {
  userData = signal<UserData>({
    name: '',
    age: null,
    tech: null,
    valid: false,
  });

  updateUser(field: string, value: string) {
    this.userData.update((data) => ({ ...data, [field]: value }));
  }

  reset() {
    this.userData.set({ name: '', age: null, tech: null, valid: false });
  }
}
