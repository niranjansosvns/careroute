export interface CatalogRecord {
  slug: string;
  title: string;
  category: string;
  summary: string;
  location?: string;
  imageUrl?: string;
  imageAlt?: string;
  highlights: string[];
  details: string[];
  displayNote?: string;
  sampleData?: boolean;
}

export interface CatalogResponse {
  collection: string;
  label: string;
  description: string;
  items: CatalogRecord[];
  categories: string[];
  total: number;
  page: number;
  pageSize: number;
}

export interface PortalContentBundle {
  catalogs: Record<string, {
    label: string;
    description: string;
    items: CatalogRecord[];
  }>;
  pages: Record<string, InformationPage>;
}

export interface CatalogPageContent {
  collection: string;
  label: string;
  description: string;
  item: CatalogRecord;
}

export interface InformationPage {
  slug: string;
  eyebrow: string;
  title: string;
  summary: string;
  sections: Array<{
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  }>;
}

export interface SearchResponse {
  query: string;
  results: Array<CatalogPageContent>;
  total: number;
}