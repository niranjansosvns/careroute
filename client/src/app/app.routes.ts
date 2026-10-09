import { Routes } from '@angular/router';
import { CatalogDetailPage } from './features/catalog/catalog-detail-page/catalog-detail-page';
import { CatalogListPage } from './features/catalog/catalog-list-page/catalog-list-page';
import { InformationPageView } from './features/content/information-page-view/information-page-view';
import { SearchResultsPage } from './features/search/search-results-page/search-results-page';
import { NotFoundPage } from './features/content/not-found-page/not-found-page';
import { catalogItemResolver, catalogResolver, informationPageResolver, searchResolver } from './features/catalog/catalog.resolvers';
import { homepageResolver } from './features/home/homepage.resolver';
import { AppShell } from './shell/app-shell';

export const routes: Routes = [
	{
		path: '',
		component: AppShell,
		resolve: { pageContent: homepageResolver },
		children: [
			{ path: '', loadComponent: () => import('./features/home/home-page').then((page) => page.HomePage) },
			{ path: 'directory/:collection', component: CatalogListPage, resolve: { catalog: catalogResolver } },
			{ path: 'directory/:collection/:slug', component: CatalogDetailPage, resolve: { catalogPage: catalogItemResolver } },
			{ path: 'treatments', redirectTo: 'directory/treatments', pathMatch: 'full' },
			{ path: 'treatments/:slug', component: CatalogDetailPage, data: { collection: 'treatments' }, resolve: { catalogPage: catalogItemResolver } },
			{ path: 'procedures', redirectTo: 'directory/procedures', pathMatch: 'full' },
			{ path: 'procedures/:slug', component: CatalogDetailPage, data: { collection: 'procedures' }, resolve: { catalogPage: catalogItemResolver } },
			{ path: 'services', redirectTo: 'directory/services', pathMatch: 'full' },
			{ path: 'services/:slug', component: CatalogDetailPage, data: { collection: 'services' }, resolve: { catalogPage: catalogItemResolver } },
			{ path: 'hospitals', redirectTo: 'directory/hospitals', pathMatch: 'full' },
			{ path: 'hospitals/:slug', component: CatalogDetailPage, data: { collection: 'hospitals' }, resolve: { catalogPage: catalogItemResolver } },
			{ path: 'doctors', redirectTo: 'directory/doctors', pathMatch: 'full' },
			{ path: 'doctors/:slug', component: CatalogDetailPage, data: { collection: 'doctors' }, resolve: { catalogPage: catalogItemResolver } },
			{ path: 'treatment-costs', redirectTo: 'directory/treatment-costs', pathMatch: 'full' },
			{ path: 'treatment-costs/:slug', component: CatalogDetailPage, data: { collection: 'treatment-costs' }, resolve: { catalogPage: catalogItemResolver } },
			{ path: 'destinations', redirectTo: 'directory/destinations', pathMatch: 'full' },
			{ path: 'resources', redirectTo: 'directory/resources', pathMatch: 'full' },
			{ path: 'pages/contact', loadComponent: () => import('./features/enquiries/contact-page/contact-page').then((page) => page.ContactPage) },
			{ path: 'pages/:slug', component: InformationPageView, resolve: { informationPage: informationPageResolver } },
			{ path: 'about', redirectTo: 'pages/about', pathMatch: 'full' },
			{ path: 'patient-journey', redirectTo: 'pages/patient-journey', pathMatch: 'full' },
			{ path: 'medical-visa', redirectTo: 'pages/medical-visa', pathMatch: 'full' },
			{ path: 'why-india', redirectTo: 'pages/why-india', pathMatch: 'full' },
			{ path: 'faq', redirectTo: 'pages/faq', pathMatch: 'full' },
			{ path: 'contact', redirectTo: 'pages/contact', pathMatch: 'full' },
			{ path: 'search', component: SearchResultsPage, resolve: { search: searchResolver }, runGuardsAndResolvers: 'paramsOrQueryParamsChange' },
			{ path: '**', component: NotFoundPage },
		],
	},
];
