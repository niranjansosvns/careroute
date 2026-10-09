import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { HomepageContent } from '../../../core/models/homepage-content';

@Component({
  selector: 'app-providers-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './providers-section.html',
  styleUrl: './providers-section.css',
})
export class ProvidersSection {
  readonly content = input.required<HomepageContent['providers']>();
}