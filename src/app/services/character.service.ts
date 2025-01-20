import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Character } from '@app/models';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  state = signal({
    characters: new Map<string, Character>(),
  });

  constructor() {
    this.getCharacters();
  }

  // private apiUrl = 'http://api.example.com/characters';
  // private http = inject(HttpClient);

  // Take a map of characters and transform it into an array.
  getFormattedCharacters() {
    // all clients will get the updated array when something changes,
    // because the below methods change the state and notify all clients

    return Array.from(this.state().characters.values());
  }

  // getCharacters(): Observable<Character[]> {
  //   return this.http.get<Character[]>(this.apiUrl).pipe(map(charactersAdapter));
  // }

  getCharacters(): void {
    const mockCharacters: Character[] = [
      {
        id: '1',
        name: 'Morty',
        lastname: 'Smith',
        age: 22,
      },
      {
        id: '2',
        name: 'Rick',
        lastname: 'Smith',
        age: 22,
      },
      {
        id: '3',
        name: 'Summer',
        lastname: 'Smith',
        age: 22,
      },
      {
        id: '4',
        name: 'Beth',
        lastname: 'Smith',
        age: 22,
      },
    ];

    of(mockCharacters).subscribe((result) => {
      result.forEach(
        (character) => this.state().characters.set(character.id, character) // set of map method
      );
    });
    // this is to trigger a change detection
    this.state.set({ characters: this.state().characters });
  }

  // updateCharacter(character: Character): Observable<Character> {
  //   return this.http.put<Character>(`${this.apiUrl}/${character}`, character);
  // }

  updateCharacter(character: Character): void {
    console.log({ character });

    const updatedCharacter = { ...character };

    of(updatedCharacter).subscribe((result) => {
      this.state.update((state) => {
        state.characters.set(result.id, result);
        return { characters: state.characters };
      });
    });
  }

  // deleteCharacter(id: string): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${id}`);
  // }

  deleteCharacter(id: string): void {
    of({ status: 202 }).subscribe(() => {
      this.state.update((state) => {
        state.characters.delete(id);

        return { characters: state.characters };
      });
    });
  }
}
