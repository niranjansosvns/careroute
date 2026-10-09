import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { HomepageContent } from '../../../core/models/homepage-content';
import { EnquirySection } from '../enquiry-section/enquiry-section';

@Component({
  selector: 'app-contact-page',
  imports: [EnquirySection],
  templateUrl: './contact-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactPage {
  readonly pageContent = input.required<HomepageContent>();
}