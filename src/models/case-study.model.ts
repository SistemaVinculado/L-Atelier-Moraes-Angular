export interface CaseStudy {
  slug: string;
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
  title: string;
  description: string;
  tags: string[];
  client: string;
  timeline: string;
  services: string[];
  challenge: string;
  solution: string;
  result: string;
  gallery: {
    url: string;
    width: number;
    height: number;
  }[];
}
