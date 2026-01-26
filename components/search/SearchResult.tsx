import { FileTextOutlined, CalendarOutlined } from '@ant-design/icons'
import { SearchResultProps } from '@/types'

export default function SearchResult({ results }: SearchResultProps) {
	return (
		<div className="space-y-4">
			{results.map((item, index) => (
				<div
					key={index}
					className="p-6 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
				>
					<h3 className="text-lg font-semibold text-gray-900 mb-2">
						{item.title || '无标题'}
					</h3>
					<p className="text-gray-600 text-sm mb-3 line-clamp-2">
						{item.content || '无描述'}
					</p>
					<div className="flex items-center gap-4 text-xs text-gray-500">
						{item.source && (
							<span className="flex items-center gap-1">
								<FileTextOutlined />
								{item.source}
							</span>
						)}
						{item.date && (
							<span className="flex items-center gap-1">
								<CalendarOutlined />
								{item.date}
							</span>
						)}
						{item.score && (
							<span className="ml-auto px-2 py-1 bg-blue-50 text-blue-600 rounded">
								匹配度: {Math.round(item.score * 100)}%
							</span>
						)}
					</div>
				</div>
			))}
		</div>
	)
}
