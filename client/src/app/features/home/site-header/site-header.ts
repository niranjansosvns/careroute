import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BrandContent, HeaderContent } from '../../../core/models/homepage-content';

@Component({
  selector: 'app-site-header',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './site-header.html',
  styleUrl: './site-header.css',
})
export class SiteHeader {
  readonly brand = input.required<BrandContent>();
  readonly content = input.required<HeaderContent>();
  protected readonly menuOpen = signal(false);
  protected readonly openGroup = signal('');
  protected readonly searchOpen = signal(false);
  private readonly router = inject(Router);

  protected toggleMenu(): void {
    this.menuOpen.update((isOpen) => !isOpen);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
    this.openGroup.set('');
  }

  protected toggleGroup(label: string): void {
    this.openGroup.update((current) => current === label ? '' : label);
  }

  protected toggleSearch(): void {
    this.searchOpen.update((isOpen) => !isOpen);
  }

  protected submitSearch(query: string): void {
    this.closeMenu();
    this.searchOpen.set(false);
    this.router.navigate(['/search'], { queryParams: { q: query.trim() || null } });
  }
}