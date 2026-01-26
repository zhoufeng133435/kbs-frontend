'use client'

import { useState, KeyboardEvent } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { SearchInputProps } from '@/types'

export default function SearchInput({ onSearch, defaultValue = '' }: SearchInputProps) {
	const [query, setQuery] = useState(defaultValue)

	const handleSearch = () => {
		if (query.trim()) {
			onSearch(query)
		}
	}

	const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			handleSearch()
		}
	}

	return (
		<div className="w-full max-w-2xl">
			<div className="relative">
				<input
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					onKeyPress={handleKeyPress}
					placeholder="输入搜索关键词..."
					className="w-full px-6 py-4 pr-12 text-lg border-2 border-custom-border rounded-full focus:outline-none focus:border-blue-500 transition-colors shadow-sm"
				/>
				<button
					onClick={handleSearch}
					className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors"
				>
					<SearchOutlined style={{ fontSize: '20px' }} />
				</button>
			</div>
		</div>
	)
}
