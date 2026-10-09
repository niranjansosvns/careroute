import { ChangeDetectionStrategy, Component, inject, input, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { HomepageContent } from '../../core/models/homepage-content';
import { HeroSection } from './hero-section/hero-section';
import { JourneySection } from './journey-section/journey-section';
import { ServicesSection } from './services-section/services-section';
import { CareAreasSection } from './care-areas-section/care-areas-section';
import { ProvidersSection } from './providers-section/providers-section';
import { ValuesSection } from './values-section/values-section';
import { EnquirySection } from '../enquiries/enquiry-section/enquiry-section';
import { FaqSection } from './faq-section/faq-section';
import { ClosingCallToAction } from './closing-call-to-action/closing-call-to-action';

@Component({
  selector: 'app-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HeroSection,
    JourneySection,
    ServicesSection,
    CareAreasSection,
    ProvidersSection,
    ValuesSection,
    EnquirySection,
    FaqSection,
    ClosingCallToAction,
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage implements OnInit {
  readonly pageContent = input.required<HomepageContent>();
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  ngOnInit(): void {
    this.title.setTitle(this.pageContent().metadata.title);
    this.meta.updateTag({ name: 'description', content: this.pageContent().metadata.description });
    this.meta.updateTag({ name: 'theme-color', content: this.pageContent().metadata.themeColor });
  }
}