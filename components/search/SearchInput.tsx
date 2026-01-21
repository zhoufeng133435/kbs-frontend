'use client'

interface SearchInputProps {
	onSearch: (query: string) => void
}

export default function SearchInput({ onSearch }: SearchInputProps) {
	return (
		<div className="w-full max-w-2xl">
			<input
				type="text"
				placeholder="输入搜索关键词..."
				className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
			/>
		</div>
	)
}
