import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HomepageContent } from '../../../core/models/homepage-content';
import { CatalogPageContent } from '../../../core/models/portal-catalog';

@Component({
  selector: 'app-catalog-detail-page',
  imports: [RouterLink],
  templateUrl: './catalog-detail-page.html',
  styleUrl: './catalog-detail-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogDetailPage {
  readonly catalogPage = input.required<CatalogPageContent>();
  readonly pageContent = input.required<HomepageContent>();
}