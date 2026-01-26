// 文档相关类型
export interface Document {
	id: string
	name: string
	size: number
	createTime: string
}

// 搜索相关类型
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
	source?: string
	date?: string
}

export interface SearchHistory {
	id: string
	query: string
	timestamp: Date
}

// 上传相关类型
export interface UploadResponse {
	success: boolean
	message: string
	fileId?: string
}

// 组件 Props 类型
export interface SearchInputProps {
	onSearch: (query: string) => void
	defaultValue?: string
}

export interface SearchResultProps {
	results: SearchResult[]
}

export interface FileListProps {
	files: Document[]
}
