import axios from "../config/axiosConfig";

import { Site } from "../types/culturalSiteType";




// Mapping of category value to its corresponding field
const categoryFieldMap: Record<string, string> = {
  museum: "tourism",
  gallery: "tourism",
  artwork: "tourism",
  guest_house: "tourism",
  hotel: "tourism",
  restaurant: "amenity",
  bench: "amenity",
  theatre: "amenity",
  clock: "amenity",
  deli: "shop",
  park: "leisure"
};

export const getSitesByCategory = async (value: string): Promise<Site[]> => {
  const field = categoryFieldMap[value];

  if (!field) {
    throw new Error(`No category field found for value: ${value}`);
  }

  try {
    const response = await axios.get<Site[]>(`/api/cultural-sites/sites/category/${field}/${value}`);
    console.log("Fetched sites:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching sites by category:", error);
    throw error;
  }
};

export const getFeatureById = async (id: string): Promise<Site> => {
  try {
    const encodedId = encodeURIComponent(id); // encode special characters
    const response = await axios.get<Site>(`/api/cultural-sites/sites/${encodedId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching feature by ID:", error);
    throw error;
  }
};

type SearchResult = {
  id: string;
  name: string;
};

export const searchSitesByName = async (name: string): Promise<SearchResult[]> => {
  try {
    const response = await axios.get<SearchResult[]>(`/api/cultural-sites/sitesSearch/${name}`);
    return response.data;
  } catch (error) {
    console.error("Error searching sites by name:", error);
    throw error;
  }
};
