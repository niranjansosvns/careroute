import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { HomepageContent } from '../../../core/models/homepage-content';
import { EnquiryForm } from '../enquiry-form/enquiry-form';

@Component({
  selector: 'app-enquiry-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [EnquiryForm],
  templateUrl: './enquiry-section.html',
  styleUrl: './enquiry-section.css',
})
export class EnquirySection {
  readonly content = input.required<HomepageContent['enquiry']>();
}