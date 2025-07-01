export interface SiteFeature {
  type: string;
  geometry: {
    type: string;
    coordinates: [number, number]; // [longitude, latitude]
  };
  properties: {
    name?: string;
    tourism?: string;
    amenity?: string;
    website?: string;
    [key: string]: any;
  };
}

export interface CulturalSiteCollection {
  type: string;
  features: SiteFeature[];
  // Add other properties from your backend if needed
}

export interface SimplifiedSite {
  _id: string;
  name: string;
  category: string;
  latitude: number;
  longitude: number;
  website?: string;
  address?: string;
  // Add other properties you want to display
}

export type Site = {
  id: string;
  type: string;
  geometry: {
    type: string;
    coordinates: number[];
  };
  properties: {
    name?: string;
    category?: string;
    address?: string;
    [key: string]: any; // still allows flexibility
  };
};
