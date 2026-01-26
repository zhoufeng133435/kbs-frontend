'use client'

import { useEffect, useState } from 'react'

export default function Header() {
	const [currentTime, setCurrentTime] = useState('')
	const [isExpanded, setIsExpanded] = useState(false)

	useEffect(() => {
		const updateTime = () => {
			const now = new Date()
			const formatted = now.toLocaleString('zh-CN', {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit',
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
				hour12: false
			})
			setCurrentTime(formatted)
		}

		updateTime()
		const timer = setInterval(updateTime, 1000)

		return () => clearInterval(timer)
	}, [])

	return (
		<header className={`bg-white border-l border-gray-200 h-screen sticky top-0 transition-all duration-300 ${isExpanded ? 'w-48' : 'w-16'
			}`}>
			{/* 左侧展开/折叠按钮 */}
			<div className="relative">
				<button
					onClick={() => setIsExpanded(!isExpanded)}
					className="absolute -left-2 top-20 w-4 h-4 bg-white p-2 border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-blue-600 hover:border-blue-600 shadow-sm hover:shadow-md transition-all duration-200 z-10"
				>
					<span className={`text-xs transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''
						}`}>
						◀
					</span>
				</button>
			</div>

			<div className="p-4 flex flex-col items-center gap-6">
				{/* 头像 - 可点击切换展开/收起 */}
				<div
					onClick={() => setIsExpanded(!isExpanded)}
					className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold shadow-sm cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-110"
				>
					U
				</div>

				{/* 当前时间 - 根据展开状态显示 */}
				<div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
					}`}>
					<div className="flex flex-col items-center gap-2 text-xs text-gray-600">
						<div className="font-medium">{currentTime.split(' ')[0]}</div>
						<div className="text-lg font-semibold text-gray-800">{currentTime.split(' ')[1]}</div>
					</div>
				</div>
			</div>
		</header>
	)
}
