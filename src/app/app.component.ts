import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CharacterService } from './services';
import { Character } from './models';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
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
