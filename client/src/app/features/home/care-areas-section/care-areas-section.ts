import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { HomepageContent } from '../../../core/models/homepage-content';

@Component({
  selector: 'app-care-areas-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './care-areas-section.html',
  styleUrl: './care-areas-section.css',
})
export class CareAreasSection {
  readonly content = input.required<HomepageContent['careAreas']>();
}