import type { GetArtworksParams } from "@/services/api";
import type { ArtworkSort } from "@/types/artwork";
import type { GalleryFilterState } from "@/types/gallery";
import { 
  DEFAULT_PAGE, 
  DEFAULT_LIMIT, 
  FILTER_LIMITS, 
  STATUS_OPTIONS,
} from "@/components/features/Gallery/galleryConstants";

export const formatGalleryParams = (
  filters: GalleryFilterState,
  sort?: ArtworkSort,
  page: number = DEFAULT_PAGE,
  limit: number = DEFAULT_LIMIT,
): GetArtworksParams => {
  const params: GetArtworksParams = { page, limit };

  if (sort) {
    params.sort = sort;
  }

  if (filters.category?.length > 0) {
    params.category = filters.category.join(',');
  }

  if (filters.medium?.length > 0) {
    params.medium = filters.medium.join(',');
  }

  if (filters.size?.length > 0) {
    params.size = filters.size.join(',');
  }

  if (filters.status?.length > 0) {
    params.status = filters.status.join(',');
  } else {
    params.status = STATUS_OPTIONS.map((option) => option.value).join(',');
  }

  if (filters.maxPrice < FILTER_LIMITS.MAX_PRICE) {
    params.price_lte = filters.maxPrice;
  }

  if (filters.maxYear < FILTER_LIMITS.MAX_YEAR) {
    params.year_lte = filters.maxYear;
  }

  return params;
};