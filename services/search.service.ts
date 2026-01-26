import request from '@/lib/request'
import { documentService } from './document.service'
import { SearchParams, SearchResult } from '@/types'

// 模拟搜索结果数据
const generateMockSearchResults = (query: string): SearchResult[] => {
	if (!query.trim()) return []

	const mockResults: SearchResult[] = [
		{
			id: 'result-001',
			title: `${query} - React 组件开发指南`,
			content: `这是关于 ${query} 的详细介绍。React 是一个用于构建用户界面的 JavaScript 库，由 Facebook 开发和维护。它采用组件化的开发模式，使得代码更加可维护和可复用。`,
			score: 0.95,
			source: 'React 开发指南.pdf',
			date: '2024-01-20'
		},
		{
			id: 'result-002',
			title: `TypeScript 中的 ${query} 实践`,
			content: `TypeScript 是 JavaScript 的超集，添加了类型系统。在处理 ${query} 时，我们需要注意类型安全和代码可读性。使用 TypeScript 可以在编译时发现错误，提高代码质量。`,
			score: 0.88,
			source: 'TypeScript 最佳实践.docx',
			date: '2024-01-21'
		},
		{
			id: 'result-003',
			title: `Next.js 项目中 ${query} 的应用`,
			content: `Next.js 是一个 React 框架，提供了服务端渲染、静态生成等功能。在 Next.js 中处理 ${query} 时，可以利用其强大的路由系统和数据获取机制。`,
			score: 0.82,
			source: 'Next.js 项目架构设计.md',
			date: '2024-01-22'
		},
		{
			id: 'result-004',
			title: `前端性能优化：${query} 的最佳实践`,
			content: `前端性能优化是提升用户体验的关键。在处理 ${query} 相关问题时，需要考虑加载速度、资源优化、缓存策略等多个方面。`,
			score: 0.75,
			source: '前端性能优化手册.pdf',
			date: '2024-01-23'
		},
		{
			id: 'result-005',
			title: `Tailwind CSS 中 ${query} 的样式处理`,
			content: `Tailwind CSS 是一个功能类优先的 CSS 框架。在处理 ${query} 的样式时，可以使用 Tailwind 提供的丰富工具类，快速构建响应式界面。`,
			score: 0.68,
			source: 'Tailwind CSS 使用技巧.txt',
			date: '2024-01-24'
		}
	]

	return mockResults
}

export const searchService = {
	async search(params: SearchParams): Promise<SearchResult[]> {
		// 模拟网络延迟
		await new Promise(resolve => setTimeout(resolve, 800))

		// 返回模拟搜索结果
		return generateMockSearchResults(params.query)
	},
}
