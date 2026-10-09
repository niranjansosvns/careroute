import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomepageContent } from '../core/models/homepage-content';
import { SiteFooter } from '../features/home/site-footer/site-footer';
import { SiteHeader } from '../features/home/site-header/site-header';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, SiteHeader, SiteFooter],
  templateUrl: './app-shell.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppShell {
  readonly pageContent = input.required<HomepageContent>();
}