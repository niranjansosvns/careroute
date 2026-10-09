import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BrandContent, HeaderContent, HomepageContent } from '../../../core/models/homepage-content';

@Component({
  selector: 'app-site-footer',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './site-footer.html',
  styleUrl: './site-footer.css',
})
export class SiteFooter {
  readonly brand = input.required<BrandContent>();
  readonly header = input.required<HeaderContent>();
  readonly content = input.required<HomepageContent['footer']>();
  protected readonly exploreLinks = computed(() => this.header().links.flatMap((link) =>
    link.children?.length ? link.children : [link],
  ));
}