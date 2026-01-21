export default function Sidebar() {
	return (
		<aside className="w-64 bg-gray-50 border-r min-h-screen p-4">
			<nav className="space-y-2">
				<a href="/" className="block px-4 py-2 rounded hover:bg-gray-200">
					首页
				</a>
				<a href="/search" className="block px-4 py-2 rounded hover:bg-gray-200">
					搜索
				</a>
				<a href="/upload" className="block px-4 py-2 rounded hover:bg-gray-200">
					上传
				</a>
				<a href="/document" className="block px-4 py-2 rounded hover:bg-gray-200">
					文档管理
				</a>
			</nav>
		</aside>
	)
}
