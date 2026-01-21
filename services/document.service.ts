import request from '@/lib/request'

export interface Document {
	id: string
	name: string
	size: number
	createTime: string
}

export const documentService = {
	async getList(): Promise<Document[]> {
		const response = await request.get('/api/document')
		return response.data
	},

	async delete(id: string): Promise<void> {
		await request.delete(`/api/document?id=${id}`)
	},
}
