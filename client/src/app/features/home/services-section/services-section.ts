import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { HomepageContent } from '../../../core/models/homepage-content';

@Component({
  selector: 'app-services-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './services-section.html',
  styleUrl: './services-section.css',
})
export class ServicesSection {
  readonly content = input.required<HomepageContent['services']>();
}