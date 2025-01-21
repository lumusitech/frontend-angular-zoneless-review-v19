import { Character } from '@app/character/models';

export const charactersAdapter = (characters: Character[]) =>
  characters.map((c) => ({ ...c, name: c.name.toUpperCase() }));
