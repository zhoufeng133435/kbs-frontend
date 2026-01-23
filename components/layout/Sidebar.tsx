'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Sidebar() {
	const pathname = usePathname()
	const [isFileManagementOpen, setIsFileManagementOpen] = useState(true)

	const navItems = [
		{ href: '/', label: '首页', icon: '🏠' },
		{ href: '/search', label: '搜索', icon: '🔍' },
	]

	const fileManagementItems = [
		{ href: '/upload', label: '文件上传', icon: '📤' },
		{ href: '/document', label: '文档管理', icon: '📁' },
	]

	return (
		<aside className="w-64 bg-white border-r min-h-full p-4">
			<nav className="space-y-6">
				{/* 主菜单 */}
				<div className="space-y-2">
					{navItems.map((item) => {
						const isActive = pathname === item.href
						return (
							<Link
								key={item.href}
								href={item.href}
								className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${isActive
										? 'bg-blue-50 text-blue-600'
										: 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
									}`}
							>
								<span className="text-sm">{item.icon}</span>
								<span>{item.label}</span>
							</Link>
						)
					})}
				</div>

				{/* 文件管理分组 */}
				<div>
					<button
						onClick={() => setIsFileManagementOpen(!isFileManagementOpen)}
						className="w-full flex items-center justify-between px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-700 transition-colors"
					>
						<span>文件管理</span>
						<span className={`text-[10px] transform transition-transform duration-200 ${isFileManagementOpen ? 'rotate-180' : ''
							}`}>
							▼
						</span>
					</button>
					{isFileManagementOpen && (
						<div className="space-y-2 mt-2">
							{fileManagementItems.map((item) => {
								const isActive = pathname === item.href
								return (
									<Link
										key={item.href}
										href={item.href}
										className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${isActive
												? 'bg-blue-50 text-blue-600'
												: 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
											}`}
									>
										<span className="text-sm">{item.icon}</span>
										<span>{item.label}</span>
									</Link>
								)
							})}
						</div>
					)}
				</div>
			</nav>
		</aside>
	)
}
