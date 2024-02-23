export type ProductQuery = string | {};
export class SearchBookDto {
	title: string
	category: string
}
export type BookSortOptions =
	| -1
	| 1
	| 'asc'
	| 'desc'
	| 'ascending'
	| 'descending';

export interface BookSearchOptions {
	sort?: BookSortOptions,
	page?: number,
	limit?: number;
}

