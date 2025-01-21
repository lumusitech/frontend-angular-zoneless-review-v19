import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CharacterGridComponent } from './character/character-grid/character-grid.component';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-root',
  imports: [CharacterGridComponent, FormComponent],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
