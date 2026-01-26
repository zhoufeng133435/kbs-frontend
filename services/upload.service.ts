import request from '@/lib/request'
import { documentService } from './document.service'
import { Document, UploadResponse } from '@/types'

export const uploadService = {
	async upload(file: File): Promise<UploadResponse> {
		// 模拟上传进度，等待 1 秒
		await new Promise(resolve => setTimeout(resolve, 1000))

		// 创建文档对象
		const newDocument: Document = {
			id: `doc-${Date.now()}`,
			name: file.name,
			size: file.size,
			createTime: new Date().toISOString()
		}

		// 添加到 localStorage
		await documentService.add(newDocument)

		return {
			success: true,
			message: '上传成功',
			fileId: newDocument.id
		}
	},
}
