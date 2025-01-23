import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
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

  items = signal(this.form.controls.items.controls);

  totalValue = computed(() => {
    const value = this.items().reduce(
      (total, formGroup) => total + +formGroup.controls.value.value,
      0
    );
    console.log(`computed total value: ${value}`);
    return value;
  });

  constructor() {
    effect(() => {
      this.form.controls.items.valueChanges.subscribe((items) => {
        this.items.set([...this.form.controls.items.controls]);
      });
    });
  }

  addItem() {
    const id = this.items().length + 1;

    const itemForm = this.fb.group<ItemForm>({
      id: this.fb.control(id),
      name: this.fb.control('', { validators: [Validators.required] }),
      value: this.fb.control(0, { validators: [Validators.required] }),
    });

    this.form.controls.items.push(itemForm);

    // with this, we update the signal for reactivity
    this.items.set([...this.form.controls.items.controls]);
  }
}
