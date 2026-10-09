import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { HomepageContent } from '../../../core/models/homepage-content';

@Component({
  selector: 'app-faq-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './faq-section.html',
  styleUrl: './faq-section.css',
})
export class FaqSection {
  readonly content = input.required<HomepageContent['faq']>();
}