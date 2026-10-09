import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { HomepageContent } from '../../../core/models/homepage-content';

@Component({
  selector: 'app-journey-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './journey-section.html',
  styleUrl: './journey-section.css',
})
export class JourneySection {
  readonly content = input.required<HomepageContent['journey']>();
}