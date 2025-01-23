import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomInputComponent } from '@app/custom-input/custom-input.component';
import { ItemForm } from '@app/form/form-container/form.component';

@Component({
  selector: 'app-form-child',
  imports: [ReactiveFormsModule, CustomInputComponent],
  templateUrl: './form-child.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormChildComponent {
  formGroup = input.required<FormGroup<ItemForm>>();
}
