'use client'

import { useState, useRef, DragEvent } from 'react'
import {
	UploadOutlined,
	FileTextOutlined,
	DeleteOutlined,
	CloudUploadOutlined,
	CloseOutlined
} from '@ant-design/icons'
import { useDocument } from '@/hooks/useDocument'
import { useUpload } from '@/hooks/useUpload'
import { Document } from '@/types'

export default function UploadPage() {
	const { documents, loading, error, deleteDocument, refresh } = useDocument()
	const { uploading, upload } = useUpload()
	const [selectedFile, setSelectedFile] = useState<Document | null>(null)
	const [isDragging, setIsDragging] = useState(false)
	const fileInputRef = useRef<HTMLInputElement>(null)

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

	const handleFileSelect = (file: Document) => {
		setSelectedFile(file)
	}

	const handleUploadClick = () => {
		fileInputRef.current?.click()
	}

	const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files
		if (files && files.length > 0) {
			await handleFileUpload(files[0])
		}
	}

	const handleFileUpload = async (file: File) => {
		try {
			await upload(file)
			await refresh()
			if (fileInputRef.current) {
				fileInputRef.current.value = ''
			}
		} catch (err) {
			console.error('Upload failed:', err)
		}
	}

	const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		setIsDragging(true)
	}

	const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		setIsDragging(false)
	}

	const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		setIsDragging(false)
		const files = e.dataTransfer.files
		if (files && files.length > 0) {
			await handleFileUpload(files[0])
		}
	}

	const handleDelete = async (id: string) => {
		if (confirm('确定要删除这个文件吗？')) {
			await deleteDocument(id)
			if (selectedFile?.id === id) {
				setSelectedFile(null)
			}
		}
	}

	return (
		<div className="flex h-screen bg-white">
			{/* 左侧文件列表 */}
			<div className="w-80 bg-sidebar border-r border-custom-border flex flex-col">
				{/* 上传按钮 */}
				<div className="p-4 border-b border-custom-border">
					<button
						onClick={handleUploadClick}
						disabled={uploading}
						className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-lg transition-colors"
					>
						<UploadOutlined style={{ fontSize: '18px' }} />
						<span>{uploading ? '上传中...' : '上传文件'}</span>
					</button>
					<input
						ref={fileInputRef}
						type="file"
						onChange={handleFileChange}
						className="hidden"
						accept=".pdf,.doc,.docx,.txt,.md"
					/>
				</div>

				{/* 文件列表 */}
				<div className="flex-1 overflow-y-auto">
					<div className="p-4">
						<h3 className="text-sm font-semibold text-gray-600 uppercase mb-3">
							文件列表 ({documents.length})
						</h3>
						{loading ? (
							<div className="flex justify-center py-8">
								<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
							</div>
						) : error ? (
							<p className="text-sm text-red-500 text-center py-8">{error}</p>
						) : documents.length === 0 ? (
							<p className="text-sm text-gray-400 text-center py-8">暂无文件</p>
						) : (
							<div className="space-y-2">
								{documents.map((doc) => (
									<div
										key={doc.id}
										onClick={() => handleFileSelect(doc)}
										className={`group flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${selectedFile?.id === doc.id
											? 'bg-blue-50 border border-blue-200'
											: 'hover:bg-gray-100'
											}`}
									>
										<FileTextOutlined className="text-gray-400 mt-0.5" style={{ fontSize: '18px' }} />
										<div className="flex-1 min-w-0">
											<p className="text-sm font-medium text-gray-700 truncate">{doc.name}</p>
											<p className="text-xs text-gray-400 mt-1">
												{formatFileSize(doc.size)}
											</p>
											<p className="text-xs text-gray-400">
												{formatDate(doc.createTime)}
											</p>
										</div>
										<button
											onClick={(e) => {
												e.stopPropagation()
												handleDelete(doc.id)
											}}
											className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded transition-all"
										>
											<DeleteOutlined className="text-gray-400 hover:text-red-500" style={{ fontSize: '14px' }} />
										</button>
									</div>
								))}
							</div>
						)}
					</div>
				</div>
			</div>

			{/* 右侧内容区 */}
			<div className="flex-1 flex flex-col">
				<div className="flex-1 flex items-center justify-center">
					{!selectedFile ? (
						/* 上传区域 */
						<div className="w-full max-w-2xl">
							<div
								onDragOver={handleDragOver}
								onDragLeave={handleDragLeave}
								onDrop={handleDrop}
								className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${isDragging
									? 'border-blue-500 bg-blue-50'
									: 'border-gray-300 hover:border-gray-400'
									}`}
							>
								<CloudUploadOutlined className="mx-auto mb-4 text-gray-400" style={{ fontSize: '64px' }} />
								<h3 className="text-xl font-semibold text-gray-700 mb-2">
									上传文档
								</h3>
								<p className="text-gray-500 mb-6">
									拖拽文件到此处或点击按钮选择文件
								</p>
								<button
									onClick={handleUploadClick}
									disabled={uploading}
									className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-lg transition-colors inline-flex items-center gap-2"
								>
									<UploadOutlined style={{ fontSize: '18px' }} />
									{uploading ? '上传中...' : '选择文件'}
								</button>
								<p className="text-xs text-gray-400 mt-4">
									支持格式: PDF, DOC, DOCX, TXT, MD
								</p>
							</div>
						</div>
					) : (
						/* 文件详情 */
						<div className="w-full max-w-3xl">
							<div className="bg-white border border-custom-border rounded-lg shadow-sm">
								{/* 详情头部 */}
								<div className="p-6 border-b border-custom-border">
									<div className="flex items-start gap-4">
										<div className="p-3 bg-blue-50 rounded-lg">
											<FileTextOutlined className="text-blue-500" style={{ fontSize: '32px' }} />
										</div>
										<div className="flex-1">
											<h2 className="text-2xl font-bold text-gray-800 mb-2">
												{selectedFile.name}
											</h2>
											<div className="flex items-center gap-4 text-sm text-gray-500">
												<span>ID: {selectedFile.id}</span>
											</div>
										</div>
										<button
											onClick={() => setSelectedFile(null)}
											className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
										>
											<CloseOutlined className="text-gray-400" style={{ fontSize: '24px' }} />
										</button>
									</div>
								</div>

								{/* 详情内容 */}
								<div className="p-6">
									<h3 className="text-lg font-semibold text-gray-800 mb-4">文件信息</h3>
									<div className="space-y-3">
										<div className="flex items-center justify-between py-3 border-b border-custom-border">
											<span className="text-sm text-gray-600">文件名称</span>
											<span className="text-sm font-medium text-gray-800">{selectedFile.name}</span>
										</div>
										<div className="flex items-center justify-between py-3 border-b border-custom-border">
											<span className="text-sm text-gray-600">文件大小</span>
											<span className="text-sm font-medium text-gray-800">{formatFileSize(selectedFile.size)}</span>
										</div>
										<div className="flex items-center justify-between py-3 border-b border-custom-border">
											<span className="text-sm text-gray-600">上传时间</span>
											<span className="text-sm font-medium text-gray-800">{formatDate(selectedFile.createTime)}</span>
										</div>
										<div className="flex items-center justify-between py-3">
											<span className="text-sm text-gray-600">文件ID</span>
											<span className="text-sm font-mono text-gray-800">{selectedFile.id}</span>
										</div>
									</div>
								</div>

								{/* 操作按钮 */}
								<div className="p-6 border-t border-custom-border bg-sidebar">
									<button
										onClick={() => handleDelete(selectedFile.id)}
										className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors inline-flex items-center gap-2"
									>
										<DeleteOutlined style={{ fontSize: '14px' }} />
										删除文件
									</button>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
