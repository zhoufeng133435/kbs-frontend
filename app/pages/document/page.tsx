'use client'

import { useState } from 'react'
import { FileTextOutlined, DeleteOutlined, SearchOutlined, CheckOutlined } from '@ant-design/icons'
import { useDocument } from '@/hooks/useDocument'
import { Document } from '@/types'

export default function DocumentPage() {
	const { documents, loading, error, deleteDocument } = useDocument()
	const [searchQuery, setSearchQuery] = useState('')
	const [selectedIds, setSelectedIds] = useState<string[]>([])
	const [sortBy, setSortBy] = useState<'name' | 'size' | 'date'>('date')
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

	const formatFileSize = (bytes: number) => {
		if (bytes === 0) return '0 Bytes'
		const k = 1024
		const sizes = ['Bytes', 'KB', 'MB', 'GB']
		const i = Math.floor(Math.log(bytes) / Math.log(k))
		return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
	}

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleString('zh-CN', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit'
		})
	}

	// 过滤和排序文档
	const filteredDocuments = documents
		.filter(doc => doc.name.toLowerCase().includes(searchQuery.toLowerCase()))
		.sort((a, b) => {
			let comparison = 0
			if (sortBy === 'name') {
				comparison = a.name.localeCompare(b.name)
			} else if (sortBy === 'size') {
				comparison = a.size - b.size
			} else if (sortBy === 'date') {
				comparison = new Date(a.createTime).getTime() - new Date(b.createTime).getTime()
			}
			return sortOrder === 'asc' ? comparison : -comparison
		})

	const handleSelectAll = () => {
		if (selectedIds.length === filteredDocuments.length) {
			setSelectedIds([])
		} else {
			setSelectedIds(filteredDocuments.map(doc => doc.id))
		}
	}

	const handleSelectOne = (id: string) => {
		if (selectedIds.includes(id)) {
			setSelectedIds(selectedIds.filter(sid => sid !== id))
		} else {
			setSelectedIds([...selectedIds, id])
		}
	}

	const handleDelete = async (id: string) => {
		if (confirm('确定要删除这个文件吗?')) {
			await deleteDocument(id)
			setSelectedIds(selectedIds.filter(sid => sid !== id))
		}
	}

	const handleBatchDelete = async () => {
		if (selectedIds.length === 0) return
		if (confirm(`确定要删除选中的 ${selectedIds.length} 个文件吗?`)) {
			for (const id of selectedIds) {
				await deleteDocument(id)
			}
			setSelectedIds([])
		}
	}

	const handleSort = (field: 'name' | 'size' | 'date') => {
		if (sortBy === field) {
			setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
		} else {
			setSortBy(field)
			setSortOrder('asc')
		}
	}

	return (
		<div className="h-screen bg-white flex flex-col">
			{/* 顶部工具栏 */}
			<div className="border-b border-custom-border bg-sidebar">
				<div className="px-4 py-4">
					<h1 className="text-2xl font-bold text-gray-800 mb-4">文档管理</h1>

					<div className="flex items-center justify-between gap-4">
						{/* 搜索框 */}
						<div className="flex-1 max-w-md relative">
							<SearchOutlined className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" style={{ fontSize: '18px' }} />
							<input
								type="text"
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								placeholder="搜索文档名称..."
								className="w-full pl-10 pr-4 py-2 border border-custom-border rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
							/>
						</div>

						{/* 批量操作按钮 */}
						<div className="flex items-center gap-3">
							{selectedIds.length > 0 && (
								<>
									<span className="text-sm text-gray-600">
										已选择 {selectedIds.length} 项
									</span>
									<button
										onClick={handleBatchDelete}
										className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors inline-flex items-center gap-2"
									>
										<DeleteOutlined style={{ fontSize: '14px' }} />
										批量删除
									</button>
								</>
							)}
						</div>
					</div>
				</div>
			</div>

			{/* 文档列表 */}
			<div className="flex-1 overflow-y-auto">
				<div className="px-4 py-4">
					{loading ? (
						<div className="flex items-center justify-center py-12">
							<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
							<span className="ml-3 text-gray-600">加载中...</span>
						</div>
					) : error ? (
						<div className="text-center py-12">
							<p className="text-red-500">{error}</p>
						</div>
					) : filteredDocuments.length === 0 ? (
						<div className="text-center py-12">
							<FileTextOutlined className="mx-auto mb-4 text-gray-300" style={{ fontSize: '64px' }} />
							<p className="text-gray-500">
								{searchQuery ? '未找到匹配的文档' : '暂无文档'}
							</p>
						</div>
					) : (
						<div className="bg-white border border-custom-border rounded-lg overflow-hidden">
							{/* 表格头部 */}
							<div className="bg-sidebar border-b border-custom-border">
								<div className="flex items-center px-6 py-3">
									{/* 全选checkbox */}
									<div className="w-12 flex items-center justify-center">
										<button
											onClick={handleSelectAll}
											className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${selectedIds.length === filteredDocuments.length && filteredDocuments.length > 0
												? 'bg-blue-500 border-blue-500'
												: 'border-custom-border hover:border-gray-400'
												}`}
										>
											{selectedIds.length === filteredDocuments.length && filteredDocuments.length > 0 && (
												<CheckOutlined className="text-white" style={{ fontSize: '14px' }} />
											)}
										</button>
									</div>

									{/* 列标题 */}
									<div className="flex-1 flex items-center">
										<button
											onClick={() => handleSort('name')}
											className="flex-1 text-left text-sm font-semibold text-gray-600 hover:text-gray-800 transition-colors"
										>
											文件名 {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
										</button>
										<button
											onClick={() => handleSort('size')}
											className="w-32 text-left text-sm font-semibold text-gray-600 hover:text-gray-800 transition-colors"
										>
											大小 {sortBy === 'size' && (sortOrder === 'asc' ? '↑' : '↓')}
										</button>
										<button
											onClick={() => handleSort('date')}
											className="w-48 text-left text-sm font-semibold text-gray-600 hover:text-gray-800 transition-colors"
										>
											上传时间 {sortBy === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
										</button>
										<div className="w-24 text-sm font-semibold text-gray-600">操作</div>
									</div>
								</div>
							</div>

							{/* 文档列表项 */}
							<div className="divide-y divide-custom-border">
								{filteredDocuments.map((doc) => (
									<div
										key={doc.id}
										className={`flex items-center px-6 py-4 hover:bg-gray-50 transition-colors ${selectedIds.includes(doc.id) ? 'bg-blue-50' : ''
											}`}
									>
										{/* 选择框 */}
										<div className="w-12 flex items-center justify-center">
											<button
												onClick={() => handleSelectOne(doc.id)}
												className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${selectedIds.includes(doc.id)
													? 'bg-blue-500 border-blue-500'
													: 'border-custom-border hover:border-gray-400'
													}`}
											>
												{selectedIds.includes(doc.id) && (
													<CheckOutlined className="text-white" style={{ fontSize: '14px' }} />
												)}
											</button>
										</div>

										{/* 文档信息 */}
										<div className="flex-1 flex items-center">
											<div className="flex-1 flex items-center gap-3">
												<FileTextOutlined className="text-blue-500" style={{ fontSize: '24px' }} />
												<span className="text-sm text-gray-800 truncate">{doc.name}</span>
											</div>
											<div className="w-32 text-sm text-gray-600">
												{formatFileSize(doc.size)}
											</div>
											<div className="w-48 text-sm text-gray-600">
												{formatDate(doc.createTime)}
											</div>
											<div className="w-24">
												<button
													onClick={() => handleDelete(doc.id)}
													className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
													title="删除"
												>
													<DeleteOutlined className="text-gray-400 group-hover:text-red-500 transition-colors" style={{ fontSize: '18px' }} />
												</button>
											</div>
										</div>
									</div>
								))}
							</div>
						</div>
					)}
				</div>
			</div>

			{/* 底部统计信息 */}
			{!loading && !error && filteredDocuments.length > 0 && (
				<div className="border-t border-custom-border bg-sidebar px-8 py-4">
					<div className="flex items-center justify-between text-sm text-gray-600">
						<span>共 {filteredDocuments.length} 个文档</span>
						<span>
							总大小: {formatFileSize(filteredDocuments.reduce((sum, doc) => sum + doc.size, 0))}
						</span>
					</div>
				</div>
			)}
		</div>
	)
}
