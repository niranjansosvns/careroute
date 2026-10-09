import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { CareRouteApi } from './care-route-api';

describe('CareRouteApi', () => {
  let api: CareRouteApi;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    api = TestBed.inject(CareRouteApi);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('loads homepage content from the versioned REST endpoint', () => {
    api.getHomepage().subscribe((content) => expect(content.brand.name).toBe('CareRoute'));
    http.expectOne('/api/v1/content/homepage').flush({ brand: { name: 'CareRoute' } });
  });

  it('posts enquiries to the versioned REST endpoint', () => {
    api.createEnquiry({
      name: 'Sample Patient',
      email: 'patient@example.test',
      phone: '',
      careArea: 'Cardiology',
      message: '',
      consent: true,
      website: '',
    }, 'Your email app should open with this enquiry addressed.').subscribe((response) => expect(response.message).toContain('enquiry'));

    const request = http.expectOne('/api/v1/enquiries');
    expect(request.request.method).toBe('POST');
    request.flush({ message: 'Your enquiry has been received.' });
  });
});