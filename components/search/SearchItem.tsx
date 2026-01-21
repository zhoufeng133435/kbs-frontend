interface SearchItemProps {
	title: string
	content: string
	score?: number
}

export default function SearchItem({ title, content, score }: SearchItemProps) {
	return (
		<div className="p-4 border rounded-lg hover:shadow-md transition">
			<h3 className="text-lg font-semibold mb-2">{title}</h3>
			<p className="text-gray-600 mb-2">{content}</p>
			{score && <span className="text-sm text-gray-400">相似度: {score}</span>}
		</div>
	)
}
