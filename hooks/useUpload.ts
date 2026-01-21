'use client'

import { useState } from 'react'
import { uploadService } from '@/services/upload.service'

export function useUpload() {
	const [uploading, setUploading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const upload = async (file: File) => {
		setUploading(true)
		setError(null)
		try {
			const result = await uploadService.upload(file)
			return result
		} catch (err) {
			setError('上传失败')
			throw err
		} finally {
			setUploading(false)
		}
	}

	return { uploading, error, upload }
}
