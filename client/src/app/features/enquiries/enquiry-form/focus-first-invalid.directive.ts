import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: 'form[appFocusFirstInvalid]',
  standalone: true,
})
export class FocusFirstInvalidDirective {
  private readonly form = inject<ElementRef<HTMLFormElement>>(ElementRef);

  @HostListener('submit')
  focusFirstInvalidControl(): void {
    requestAnimationFrame(() => {
      const invalidControl = this.form.nativeElement.querySelector<HTMLElement>(
        'input.ng-invalid:not(.honeypot), select.ng-invalid, textarea.ng-invalid',
      );
      invalidControl?.focus();
    });
  }
}