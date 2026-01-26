import request from '@/lib/request'
import { Document } from '@/types'

const STORAGE_KEY = 'kbs_documents'

// 初始化模拟数据
const initMockData = () => {
	if (typeof window === 'undefined') return

	const existing = localStorage.getItem(STORAGE_KEY)
	if (!existing) {
		const mockDocuments: Document[] = [
			{
				id: 'doc-001',
				name: 'React 开发指南.pdf',
				size: 2457600, // 2.4 MB
				createTime: new Date('2024-01-20 10:30:00').toISOString()
			},
			{
				id: 'doc-002',
				name: 'TypeScript 最佳实践.docx',
				size: 1536000, // 1.5 MB
				createTime: new Date('2024-01-21 14:20:00').toISOString()
			},
			{
				id: 'doc-003',
				name: 'Next.js 项目架构设计.md',
				size: 524288, // 512 KB
				createTime: new Date('2024-01-22 09:15:00').toISOString()
			},
			{
				id: 'doc-004',
				name: '前端性能优化手册.pdf',
				size: 3145728, // 3 MB
				createTime: new Date('2024-01-23 16:45:00').toISOString()
			},
			{
				id: 'doc-005',
				name: 'Tailwind CSS 使用技巧.txt',
				size: 102400, // 100 KB
				createTime: new Date('2024-01-24 11:30:00').toISOString()
			}
		]
		localStorage.setItem(STORAGE_KEY, JSON.stringify(mockDocuments))
	}
}

// 获取文档列表
const getDocumentsFromStorage = (): Document[] => {
	if (typeof window === 'undefined') return []
	initMockData()
	const data = localStorage.getItem(STORAGE_KEY)
	return data ? JSON.parse(data) : []
}

// 保存文档列表
const saveDocumentsToStorage = (documents: Document[]) => {
	if (typeof window === 'undefined') return
	localStorage.setItem(STORAGE_KEY, JSON.stringify(documents))
}

export const documentService = {
	async getList(): Promise<Document[]> {
		// 模拟网络延迟
		await new Promise(resolve => setTimeout(resolve, 500))
		return getDocumentsFromStorage()
	},

	async delete(id: string): Promise<void> {
		// 模拟网络延迟
		await new Promise(resolve => setTimeout(resolve, 300))
		const documents = getDocumentsFromStorage()
		const filtered = documents.filter(doc => doc.id !== id)
		saveDocumentsToStorage(filtered)
	},

	async add(document: Document): Promise<Document> {
		// 模拟网络延迟
		await new Promise(resolve => setTimeout(resolve, 500))
		const documents = getDocumentsFromStorage()
		documents.unshift(document)
		saveDocumentsToStorage(documents)
		return document
	}
}
