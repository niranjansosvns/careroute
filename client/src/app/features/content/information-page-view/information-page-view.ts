import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { HomepageContent } from '../../../core/models/homepage-content';
import { InformationPage } from '../../../core/models/portal-catalog';

@Component({
  selector: 'app-information-page-view',
  templateUrl: './information-page-view.html',
  styleUrl: './information-page-view.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InformationPageView {
  readonly informationPage = input.required<InformationPage>();
  readonly pageContent = input.required<HomepageContent>();
}