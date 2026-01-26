'use client'

import { useState } from 'react'
import { PlusOutlined, ClockCircleOutlined, DeleteOutlined } from '@ant-design/icons'
import { useSearch } from '@/hooks/useSearch'
import SearchInput from '@/components/search/SearchInput'
import SearchResult from '@/components/search/SearchResult'
import { SearchHistory } from '@/types'

export default function SearchPage() {
	const { results, loading, error, search } = useSearch()
	const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([])
	const [currentQuery, setCurrentQuery] = useState('')

	const handleSearch = async (query: string) => {
		if (!query.trim()) return

		setCurrentQuery(query)
		await search(query)

		// 添加到搜索历史
		const newHistory: SearchHistory = {
			id: Date.now().toString(),
			query,
			timestamp: new Date()
		}
		setSearchHistory(prev => [newHistory, ...prev.filter(item => item.query !== query)])
	}

	const handleHistoryClick = (query: string) => {
		handleSearch(query)
	}

	const handleDeleteHistory = (id: string) => {
		setSearchHistory(prev => prev.filter(item => item.id !== id))
	}

	const handleClearHistory = () => {
		setSearchHistory([])
	}

	const handleNewSearch = () => {
		setCurrentQuery('')
	}

	return (
		<div className="flex h-screen bg-white">
			{/* 左侧边栏 */}
			<div className="w-64 border-r border-custom-border flex flex-col">
				{/* 功能区 */}
				<div className="p-4 border-b border-custom-border">
					<button
						onClick={handleNewSearch}
						className="w-full flex items-center gap-2 px-4 py-3 bg-white hover:bg-gray-100 border border-custom-border rounded-lg transition-colors text-gray-700"
					>
						<PlusOutlined />
						<span>新建搜索</span>
					</button>
				</div>

				{/* 搜索历史 */}
				<div className="flex-1 overflow-y-auto">
					<div className="p-4">
						<div className="flex items-center justify-between mb-3">
							<h3 className="text-sm font-semibold text-gray-600 uppercase">搜索历史</h3>
							{searchHistory.length > 0 && (
								<button
									onClick={handleClearHistory}
									className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
								>
									清空
								</button>
							)}
						</div>
						<div className="space-y-2">
							{searchHistory.length === 0 ? (
								<p className="text-sm text-gray-400 text-center py-8">暂无搜索历史</p>
							) : (
								searchHistory.map((item) => (
									<div
										key={item.id}
										className="group flex items-start gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
									>
										<ClockCircleOutlined className="mt-0.5 text-gray-400" style={{ fontSize: '14px' }} />
										<div
											onClick={() => handleHistoryClick(item.query)}
											className="flex-1 min-w-0"
										>
											<p className="text-sm truncate text-gray-700">{item.query}</p>
											<p className="text-xs text-gray-400 mt-0.5">
												{new Date(item.timestamp).toLocaleDateString('zh-CN', {
													month: 'short',
													day: 'numeric'
												})}
											</p>
										</div>
										<button
											onClick={(e) => {
												e.stopPropagation()
												handleDeleteHistory(item.id)
											}}
											className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded transition-all"
										>
											<DeleteOutlined className="text-gray-400 hover:text-red-500" style={{ fontSize: '14px' }} />
										</button>
									</div>
								))
							)}
						</div>
					</div>
				</div>
			</div>

			{/* 右侧主内容区 */}
			<div className="flex-1 flex flex-col">
				{/* 搜索区域 */}
				<div className="flex-1 flex flex-col items-center">
					{!currentQuery ? (
						<div className="w-full max-w-3xl">
							<div className="text-center mb-8">
								<h1 className="text-4xl font-bold text-gray-800 mb-2">知识库搜索</h1>
								<p className="text-gray-500">输入关键词搜索文档和知识</p>
							</div>
							<SearchInput onSearch={handleSearch} />
						</div>
					) : (
						<div className="w-full max-w-4xl h-full flex flex-col pt-4">
							{/* 搜索框 */}
							<div className="mb-6">
								<SearchInput onSearch={handleSearch} />
							</div>

							{/* 搜索结果 */}
							<div className="flex-1 overflow-y-auto">
								{loading ? (
									<div className="flex items-center justify-center py-12">
										<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
										<span className="ml-3 text-gray-600">搜索中...</span>
									</div>
								) : error ? (
									<div className="text-center py-12">
										<p className="text-red-500">{error}</p>
									</div>
								) : results.length === 0 ? (
									<div className="text-center py-12">
										<p className="text-gray-500">未找到相关结果</p>
									</div>
								) : (
									<div className="space-y-4">
										<div className="text-sm text-gray-500 mb-4">
											找到 {results.length} 条结果
										</div>
										<SearchResult results={results} />
									</div>
								)}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
