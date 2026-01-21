import request from '@/lib/request'

export interface UploadResponse {
	success: boolean
	message: string
	fileId?: string
}

export const uploadService = {
	async upload(file: File): Promise<UploadResponse> {
		const formData = new FormData()
		formData.append('file', file)

		const response = await request.post('/api/upload', formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
		return response.data
	},
}
