import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, of, shareReplay, throwError } from 'rxjs';
import { CatalogPageContent, CatalogResponse, InformationPage, PortalContentBundle, SearchResponse } from '../models/portal-catalog';
import { EnquiryRequest, EnquiryResponse } from '../models/enquiry';
import { HomepageContent } from '../models/homepage-content';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CareRouteApi {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiBaseUrl;
  private readonly portalContent$ = this.http
    .get<PortalContentBundle>(`${environment.staticContentBaseUrl}/portal-catalog.json`)
    .pipe(shareReplay({ bufferSize: 1, refCount: false }));

  getHomepage(): Observable<HomepageContent> {
    if (environment.contentMode === 'static') {
      return this.http.get<HomepageContent>(`${environment.staticContentBaseUrl}/homepage.json`);
    }
    return this.http.get<HomepageContent>(`${this.baseUrl}/content/homepage`);
  }

  getCatalog(collection: string): Observable<CatalogResponse> {
    if (environment.contentMode === 'static') {
      return this.portalContent$.pipe(map((content) => {
        const catalog = content.catalogs[collection];
        if (!catalog) throw new Error(`Unknown catalog: ${collection}`);
        return {
          collection,
          label: catalog.label,
          description: catalog.description,
          categories: [...new Set(catalog.items.map((item) => item.category))],
          items: catalog.items,
          total: catalog.items.length,
          page: 1,
          pageSize: catalog.items.length,
        };
      }));
    }
    return this.http.get<CatalogResponse>(`${this.baseUrl}/catalog/${encodeURIComponent(collection)}`);
  }

  getCatalogItem(collection: string, slug: string): Observable<CatalogPageContent> {
    if (environment.contentMode === 'static') {
      return this.portalContent$.pipe(map((content) => {
        const catalog = content.catalogs[collection];
        const item = catalog?.items.find((record) => record.slug === slug);
        if (!catalog || !item) throw new Error(`Unknown catalog item: ${collection}/${slug}`);
        return { collection, label: catalog.label, description: catalog.description, item };
      }));
    }
    return this.http.get<CatalogPageContent>(`${this.baseUrl}/catalog/${encodeURIComponent(collection)}/${encodeURIComponent(slug)}`);
  }

  getInformationPage(slug: string): Observable<InformationPage> {
    if (environment.contentMode === 'static') {
      return this.portalContent$.pipe(map((content) => {
        const page = content.pages[slug];
        if (!page) throw new Error(`Unknown content page: ${slug}`);
        return page;
      }));
    }
    return this.http.get<InformationPage>(`${this.baseUrl}/pages/${encodeURIComponent(slug)}`);
  }

  search(query: string, collection = ''): Observable<SearchResponse> {
    if (environment.contentMode === 'static') {
      return this.portalContent$.pipe(map((content) => {
        const normalizedQuery = query.trim().toLocaleLowerCase();
        const catalogs = collection
          ? [[collection, content.catalogs[collection]] as const]
          : Object.entries(content.catalogs);
        const results = normalizedQuery ? catalogs.flatMap(([collectionName, catalog]) => {
          if (!catalog) return [];
          return catalog.items
            .filter((item) => [item.title, item.summary, item.category, item.location ?? '', ...item.highlights]
              .join(' ').toLocaleLowerCase().includes(normalizedQuery))
            .map((item) => ({ collection: collectionName, label: catalog.label, description: catalog.description, item }));
        }) : [];
        return { query, results, total: results.length };
      }));
    }
    return this.http.get<SearchResponse>(`${this.baseUrl}/search`, {
      params: { q: query, ...(collection ? { collection } : {}) },
    });
  }

  createEnquiry(request: EnquiryRequest, staticSuccessMessage: string): Observable<EnquiryResponse> {
    if (environment.contentMode === 'static') {
      if (!request.website.trim()) {
        const subject = encodeURIComponent(`CareRoute enquiry: ${request.careArea}`);
        const body = encodeURIComponent([
          'Care coordination enquiry',
          '',
          `Name: ${request.name}`,
          `Email: ${request.email}`,
          `Phone: ${request.phone || 'Not provided'}`,
          `Care area: ${request.careArea}`,
          '',
          'General message:',
          request.message || 'Not provided',
        ].join('\n'));
        window.location.href = `mailto:${environment.notificationEmail}?subject=${subject}&body=${body}`;
      }
      return of({ message: staticSuccessMessage });
    }
    return this.http.post<EnquiryResponse>(`${this.baseUrl}/enquiries`, request);
  }
}