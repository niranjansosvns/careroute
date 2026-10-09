import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CareRouteApi } from '../../../core/services/care-route-api';
import { EnquiryRequest } from '../../../core/models/enquiry';
import { EnquiryFormContent } from '../../../core/models/homepage-content';
import { FocusFirstInvalidDirective } from './focus-first-invalid.directive';

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error';

@Component({
  selector: 'app-enquiry-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, FocusFirstInvalidDirective],
  templateUrl: './enquiry-form.html',
  styleUrl: './enquiry-form.css',
})
export class EnquiryForm {
  readonly content = input.required<EnquiryFormContent>();
  protected readonly submissionState = signal<SubmissionState>('idle');
  protected readonly isSubmitting = computed(() => this.submissionState() === 'submitting');
  protected readonly statusMessage = computed(() => {
    switch (this.submissionState()) {
      case 'success': return this.content().successMessage;
      case 'error': return this.content().serverError;
      default: return '';
    }
  });

  private readonly formBuilder = inject(FormBuilder).nonNullable;
  private readonly api = inject(CareRouteApi);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly form = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(120)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(254)]],
    phone: ['', Validators.maxLength(32)],
    careArea: ['', Validators.required],
    message: ['', Validators.maxLength(500)],
    consent: [false, Validators.requiredTrue],
    website: [''],
  });

  protected submitEnquiry(): void {
    this.submissionState.set('idle');
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submissionState.set('submitting');
    const request: EnquiryRequest = { ...this.form.getRawValue(), consent: true };
    this.api.createEnquiry(request, this.content().mailtoSuccessMessage).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: () => {
        this.form.reset();
        this.submissionState.set('success');
      },
      error: (_error: HttpErrorResponse) => this.submissionState.set('error'),
    });
  }

  protected isInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    return Boolean(control?.invalid && (control.dirty || control.touched));
  }
}