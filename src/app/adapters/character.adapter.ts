import { Character } from '@app/models';

export const charactersAdapter = (characters: Character[]) =>
  characters.map((c) => ({ ...c, name: c.name.toUpperCase() }));
