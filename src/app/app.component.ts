import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CharacterGridComponent } from './character/character-grid/character-grid.component';

@Component({
  selector: 'app-root',
  imports: [CharacterGridComponent],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
