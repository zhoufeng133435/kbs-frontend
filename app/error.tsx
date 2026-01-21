'use client'

export default function Error() {
	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="text-center">
				<h1 className="text-4xl font-bold mb-4">出错了</h1>
				<p className="text-gray-600">页面加载失败，请稍后重试</p>
			</div>
		</div>
	)
}
