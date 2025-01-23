import {
  ChangeDetectionStrategy,
  Component,
  effect,
  forwardRef,
  input,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  imports: [ReactiveFormsModule],
  templateUrl: './custom-input.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true,
    },
  ],
})
export class CustomInputComponent implements ControlValueAccessor {
  control = input.required<FormControl<any>>();

  constructor() {
    effect(() => {
      const currentSignalValue = this.control().value;

      if (this.control().dirty || this.control().touched) {
        const newValue = this.control().value;

        if (newValue !== currentSignalValue) {
          this.onChange(newValue);
        }
      }
    });
  }

  onTouched = () => {};

  onChange = (_value: any) => {};

  writeValue(value: any): void {
    if (value !== this.control().value) {
      this.control().setValue(value, { emitEvent: false });
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.control().disable() : this.control().enable();
  }
}
