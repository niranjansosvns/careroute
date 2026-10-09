export interface EnquiryRequest {
  name: string;
  email: string;
  phone: string;
  careArea: string;
  message: string;
  consent: true;
  website: string;
}

export interface EnquiryResponse {
  message: string;
}