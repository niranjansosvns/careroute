import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { HomepageContent } from '../../../core/models/homepage-content';

@Component({
  selector: 'app-closing-call-to-action',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './closing-call-to-action.html',
  styleUrl: './closing-call-to-action.css',
})
export class ClosingCallToAction {
  readonly content = input.required<HomepageContent['callToAction']>();
}