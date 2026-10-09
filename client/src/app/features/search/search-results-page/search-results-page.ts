import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HomepageContent } from '../../../core/models/homepage-content';
import { SearchResponse } from '../../../core/models/portal-catalog';

@Component({
  selector: 'app-search-results-page',
  imports: [RouterLink],
  templateUrl: './search-results-page.html',
  styleUrl: './search-results-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultsPage {
  readonly search = input.required<SearchResponse>();
  readonly pageContent = input.required<HomepageContent>();
  protected readonly hasQuery = computed(() => Boolean(this.search().query.trim()));
}