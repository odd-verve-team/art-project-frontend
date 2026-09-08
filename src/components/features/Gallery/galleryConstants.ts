export const SORT_OPTIONS = [
  { label: 'PRICE : LOW TO HIGH', value: 'price_asc' },
  { label: 'PRICE : HIGH TO LOW', value: 'price_desc' },
  { label: 'DATE : NEWEST ARRIVALS', value: 'date_desc' },
  { label: 'DATE : OLDEST', value: 'date_asc' },
  { label: 'YEAR OF CREATION : NEW TO OLD', value: 'year_desc' },
  { label: 'YEAR OF CREATION : OLD TO NEW', value: 'year_asc' },
  { label: 'SIZE: SMALL TO LARGE', value: 'size_asc' },
  { label: 'SIZE: LARGE TO SMALL', value: 'size_desc' },
];

export const SUBJECT_OPTIONS = [
  { label: 'LANDSCAPE', value: 'landscape' },
  { label: 'PORTRAIT', value: 'portrait' },
  { label: 'STILL LIFE', value: 'still_life' },
  { label: 'ABSTRACT', value: 'abstract' },
  { label: 'ARCHITECTURE', value: 'architecture' },
  { label: 'AVANT-GARDE', value: 'avant-garde' },
];

export const MEDIUM_OPTIONS = [
  { label: 'OIL', value: 'oil' },
  { label: 'ACRYLIC', value: 'acrylic' },
  { label: 'WATERCOLOR', value: 'watercolor' },
  { label: 'GRAPHICS', value: 'graphics' },
  { label: 'MIXED MEDIA', value: 'mixed_media' },
  { label: 'LITHOGRAPHY', value: 'lithography' },
];

export const SIZE_OPTIONS = [
  { label: '20×25', value: '20x25' },
  { label: '21×30', value: '21x30' },
  { label: '30×40', value: '30x40' },
  { label: '40×50', value: '40x50' },
  { label: '40×60', value: '40x60' },
  { label: '50×70', value: '50x70' },
  { label: '60×90', value: '60x90' },
];

export const STATUS_OPTIONS = [
  { label: 'AVAILABLE', value: 'approved' },
  { label: 'SOLD', value: 'sold' },
];

export const FILTER_LIMITS = {
  MIN_PRICE: 0,
  MAX_PRICE: 75000,
  PRICE_STEP: 1000,
  MIN_YEAR: 1950,
  MAX_YEAR: 2026,
  YEAR_STEP: 1,
};

import type { GalleryFilterState } from '@/types/gallery';

export const DEFAULT_FILTERS: GalleryFilterState = {
  subject: [],
  medium: [],
  size: [],
  status: [],
  maxPrice: FILTER_LIMITS.MAX_PRICE,
  maxYear: FILTER_LIMITS.MAX_YEAR,
};
