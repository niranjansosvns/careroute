export interface LinkContent {
  label: string;
  href: string;
  children?: LinkContent[];
}

export interface ContactContent extends LinkContent {
  detail?: string;
}

export interface ListItemContent {
  title: string;
  description: string;
}

export interface BrandContent {
  name: string;
  tagline: string;
}

export interface HeaderContent {
  contacts: LinkContent[];
  navigationLabel: string;
  menuOpenLabel: string;
  menuCloseLabel: string;
  searchLabel: string;
  searchPlaceholder: string;
  links: LinkContent[];
  ctaLabel: string;
}

export interface JourneyContent {
  eyebrow: string;
  title: string;
  introduction: string;
  steps: ListItemContent[];
}

export interface SectionContent<TItem = never> {
  eyebrow: string;
  title: string;
  introduction?: string;
  items: TItem[];
}

export interface HomepageContent {
  metadata: {
    title: string;
    description: string;
    themeColor: string;
  };
  brand: BrandContent;
  header: HeaderContent;
  hero: {
    eyebrow: string;
    title: string;
    emphasis: string;
    description: string;
    primaryAction: string;
    secondaryAction: string;
    note: string;
    imageUrl: string;
    imageAlt: string;
    imageEyebrow: string;
    imageCaption: string;
    supportTitle: string;
    supportCaption: string;
    proof: Array<{ value: string; label: string }>;
  };
  journey: JourneyContent;
  services: SectionContent<ListItemContent>;
  careAreas: SectionContent<ArrayItemContent>;
  providers: SectionContent<ProviderContent> & { disclaimer: string; actionLabel: string };
  values: SectionContent<ListItemContent>;
  enquiry: {
    eyebrow: string;
    title: string;
    description: string;
    contacts: ContactContent[];
    form: EnquiryFormContent;
  };
  faq: {
    eyebrow: string;
    title: string;
    items: Array<{ question: string; answer: string }>;
  };
  callToAction: {
    title: string;
    description: string;
    actionLabel: string;
  };
  footer: {
    description: string;
    exploreLabel: string;
    contactLabel: string;
    commonQuestionsLabel: string;
    copyright: string;
    disclaimer: string;
  };
  portalUi: PortalUiContent;
}

export interface PortalUiContent {
  searchTitle: string;
  searchSubmitLabel: string;
  directorySearchLabel: string;
  directorySearchPlaceholder: string;
  categoryLabel: string;
  allCategoriesLabel: string;
  resultSingular: string;
  resultPlural: string;
  emptyTitle: string;
  emptyDescription: string;
  clearFiltersLabel: string;
  viewDetailsLabel: string;
  backToDirectoryLabel: string;
  detailsHeading: string;
  highlightsHeading: string;
  demoNotice: string;
  sampleListingLabel: string;
  locationLabel: string;
  requestInformationLabel: string;
  missingPageTitle: string;
  missingPageDescription: string;
  homeLinkLabel: string;
  noSearchQuery: string;
  directoryLabels: Record<string, string>;
}

export interface ArrayItemContent extends ListItemContent {
  group: string;
}

export interface ProviderContent {
  city: string;
  focus: string;
  region: string;
}

export interface EnquiryFormContent {
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  phoneLabel: string;
  phoneOptional: string;
  phonePlaceholder: string;
  careAreaLabel: string;
  careAreaPlaceholder: string;
  messageLabel: string;
  messageOptional: string;
  messagePlaceholder: string;
  consentLabel: string;
  submitLabel: string;
  submittingLabel: string;
  nameError: string;
  emailError: string;
  careAreaError: string;
  consentError: string;
  successMessage: string;
  serverError: string;
  mailtoSuccessMessage: string;
  privacyNote: string;
  careAreas: string[];
}