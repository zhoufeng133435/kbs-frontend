'use client'

import { useState, useEffect } from 'react'
import { documentService, Document } from '@/services/document.service'

export function useDocument() {
	const [documents, setDocuments] = useState<Document[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const fetchDocuments = async () => {
		setLoading(true)
		setError(null)
		try {
			const data = await documentService.getList()
			setDocuments(data)
		} catch (err) {
			setError('获取文档列表失败')
		} finally {
			setLoading(false)
		}
	}

	const deleteDocument = async (id: string) => {
		try {
			await documentService.delete(id)
			await fetchDocuments()
		} catch (err) {
			setError('删除文档失败')
		}
	}

	useEffect(() => {
		fetchDocuments()
	}, [])

	return { documents, loading, error, deleteDocument, refresh: fetchDocuments }
}
