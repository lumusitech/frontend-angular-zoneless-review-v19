import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';

import { toSignal } from '@angular/core/rxjs-interop';

import {
  FormArray,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormChildComponent } from '@app/form/form-child/form-child.component';

export interface ItemForm {
  id: FormControl<number>;
  name: FormControl<string>;
  value: FormControl<number>;
}

export type CustomFormGroup = FormGroup<ItemForm>;

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, FormChildComponent],
  templateUrl: './form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormComponent {
  fb = inject(NonNullableFormBuilder);

  form: FormGroup<{ items: FormArray<CustomFormGroup> }> = this.fb.group({
    items: this.fb.array<CustomFormGroup>([]),
  });

  get items() {
    return this.form.controls.items;
  }

  itemChanges = toSignal(this.form.valueChanges);

  totalValue = computed(() => {
    const value = this.itemChanges()?.items?.reduce(
      (total, item) => total + (Number(item.value) || 0),
      0
    );

    return value;
  });

  addItem() {
    const id = this.items.length + 1;

    const itemForm = this.fb.group<ItemForm>({
      id: this.fb.control(id),
      name: this.fb.control('', { validators: [Validators.required] }),
      value: this.fb.control(0, { validators: [Validators.required] }),
    });

    this.form.controls.items.push(itemForm);
  }
}
