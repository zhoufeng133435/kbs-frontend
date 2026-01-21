interface SearchResultProps {
	results: any[]
}

export default function SearchResult({ results }: SearchResultProps) {
	return (
		<div className="space-y-4">
			{results.map((item, index) => (
				<div key={index} className="p-4 border rounded-lg">
					{/* 搜索结果项 */}
				</div>
			))}
		</div>
	)
}
