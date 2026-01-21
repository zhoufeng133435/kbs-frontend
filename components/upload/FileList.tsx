interface FileListProps {
	files: Array<{ id: string; name: string; size: number }>
}

export default function FileList({ files }: FileListProps) {
	return (
		<div className="space-y-2">
			{files.map((file) => (
				<div key={file.id} className="flex items-center justify-between p-3 border rounded">
					<span>{file.name}</span>
					<span className="text-sm text-gray-500">{file.size} KB</span>
				</div>
			))}
		</div>
	)
}
