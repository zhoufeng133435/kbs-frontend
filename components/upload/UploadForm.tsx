'use client'

export default function UploadForm() {
	return (
		<div className="border-2 border-dashed rounded-lg p-8 text-center">
			<p className="mb-4">拖拽文件到此处或点击上传</p>
			<input type="file" className="hidden" id="file-upload" />
			<label
				htmlFor="file-upload"
				className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600"
			>
				选择文件
			</label>
		</div>
	)
}
