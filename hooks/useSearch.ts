'use client'

import { useState } from 'react'
import { searchService, SearchResult } from '@/services/search.service'

export function useSearch() {
	const [results, setResults] = useState<SearchResult[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const search = async (query: string) => {
		setLoading(true)
		setError(null)
		try {
			const data = await searchService.search({ query })
			setResults(data)
		} catch (err) {
			setError('搜索失败')
		} finally {
			setLoading(false)
		}
	}

	return { results, loading, error, search }
}
