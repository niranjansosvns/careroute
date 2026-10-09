import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { CareRouteApi } from '../../core/services/care-route-api';
import { HomepageContent } from '../../core/models/homepage-content';

export const homepageResolver: ResolveFn<HomepageContent> = () =>
  inject(CareRouteApi).getHomepage();