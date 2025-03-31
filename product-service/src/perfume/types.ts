export interface IPerfumeFilterFromQuery {
  brands?: string;
  collections?: string;
}

export interface IPerfumeFilter {
  brands?: string[];
  collections?: string[];
  minPrice?: number;
  maxPrice?: number;
}
