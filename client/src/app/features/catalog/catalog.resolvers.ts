import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { CatalogPageContent, CatalogResponse, InformationPage, SearchResponse } from '../../core/models/portal-catalog';
import { CareRouteApi } from '../../core/services/care-route-api';

export const catalogResolver: ResolveFn<CatalogResponse> = (route) =>
  inject(CareRouteApi).getCatalog(route.paramMap.get('collection') ?? '');

export const catalogItemResolver: ResolveFn<CatalogPageContent> = (route) => {
  const collection = route.paramMap.get('collection') ?? route.data['collection'] as string;
  return inject(CareRouteApi).getCatalogItem(collection, route.paramMap.get('slug') ?? '');
};

export const informationPageResolver: ResolveFn<InformationPage> = (route) =>
  inject(CareRouteApi).getInformationPage(route.paramMap.get('slug') ?? '');

export const searchResolver: ResolveFn<SearchResponse> = (route) =>
  inject(CareRouteApi).search(route.queryParamMap.get('q') ?? '', route.queryParamMap.get('collection') ?? '');