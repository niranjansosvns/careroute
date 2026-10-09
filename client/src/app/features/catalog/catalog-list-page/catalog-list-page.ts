import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HomepageContent } from '../../../core/models/homepage-content';
import { CatalogResponse } from '../../../core/models/portal-catalog';

@Component({
  selector: 'app-catalog-list-page',
  imports: [RouterLink],
  templateUrl: './catalog-list-page.html',
  styleUrl: './catalog-list-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogListPage {
  readonly catalog = input.required<CatalogResponse>();
  readonly pageContent = input.required<HomepageContent>();
  protected readonly query = signal('');
  protected readonly category = signal('');
  protected readonly filteredItems = computed(() => {
    const query = this.query().trim().toLocaleLowerCase();
    const category = this.category();
    return this.catalog().items.filter((item) => {
      const matchesQuery = !query || `${item.title} ${item.summary} ${item.category} ${item.location ?? ''}`.toLocaleLowerCase().includes(query);
      return matchesQuery && (!category || item.category === category);
    });
  });

  protected updateQuery(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
  }

  protected updateCategory(event: Event): void {
    this.category.set((event.target as HTMLSelectElement).value);
  }

  protected clearFilters(): void {
    this.query.set('');
    this.category.set('');
  }
}