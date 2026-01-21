'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
	const pathname = usePathname()

	const navItems = [
		{ href: '/', label: '首页', icon: '🏠' },
		{ href: '/search', label: '搜索', icon: '🔍' },
		{ href: '/upload', label: '上传', icon: '📤' },
		{ href: '/document', label: '文档管理', icon: '📁' },
	]

	return (
		<aside className="w-64 bg-white border-r min-h-full p-4">
			<nav className="space-y-2">
				{navItems.map((item) => {
					const isActive = pathname === item.href
					return (
						<Link
							key={item.href}
							href={item.href}
							className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
								isActive
									? 'bg-blue-50 text-blue-600 font-medium'
									: 'text-gray-700 hover:bg-gray-100'
							}`}
						>
							<span className="text-xl">{item.icon}</span>
							<span>{item.label}</span>
						</Link>
					)
				})}
			</nav>
		</aside>
	)
}
