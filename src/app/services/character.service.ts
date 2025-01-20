import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { charactersAdapter } from '@app/adapters';
import { Character } from '@app/models';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private apiUrl = 'http://api.example.com/characters';
  private http = inject(HttpClient);

  getCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(this.apiUrl).pipe(map(charactersAdapter));
  }

  updateCharacter(character: Character): Observable<Character> {
    return this.http.put<Character>(`${this.apiUrl}/${character}`, character);
  }

  deleteCharacter(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
