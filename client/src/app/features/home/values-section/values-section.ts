import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { HomepageContent } from '../../../core/models/homepage-content';

@Component({
  selector: 'app-values-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './values-section.html',
  styleUrl: './values-section.css',
})
export class ValuesSection {
  readonly content = input.required<HomepageContent['values']>();
}