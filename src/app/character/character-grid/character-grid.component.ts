import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
} from '@angular/core';
import { CharacterService } from '../services';
import { Character } from '../models';
import { CharacterItemComponent } from '../character-item/character-item.component';

@Component({
  selector: 'character-grid',
  imports: [CharacterItemComponent],
  templateUrl: './character-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterGridComponent {
  characterService = inject(CharacterService);

  characters: Signal<Character[] | undefined> = computed(() =>
    this.characterService.getFormattedCharacters()
  );

  updateCharacter(character: Character) {
    this.characterService.updateCharacter({
      ...character,
      name: character.name.toUpperCase(),
    });
  }

  deletedCharacter(id: string) {
    this.characterService.deleteCharacter(id);
  }
}
