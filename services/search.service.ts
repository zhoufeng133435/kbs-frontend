import request from '@/lib/request'

export interface SearchParams {
	query: string
	page?: number
	size?: number
}

export interface SearchResult {
	id: string
	title: string
	content: string
	score: number
}

export const searchService = {
	async search(params: SearchParams): Promise<SearchResult[]> {
		const response = await request.post('/api/search', params)
		return response.data
	},
}
