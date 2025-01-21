import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { Character } from '../models';

@Component({
  selector: 'character-item',
  imports: [],
  templateUrl: './character-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterItemComponent {
  character = input.required<Character>();

  update = output<Character>();
  delete = output<string>();

  updateCharacter() {
    this.update.emit(this.character());
  }

  deletedCharacter() {
    this.delete.emit(this.character().id);
  }
}
