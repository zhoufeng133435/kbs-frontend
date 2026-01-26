import type { Metadata } from 'next'
import '@/styles/globals.css'
import Header from '@/components/layout/Header'
import Sidebar from '@/components/layout/Sidebar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
	title: 'Knowledge Base System',
	description: '知识库系统 - 智能文档搜索与管理',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="zh-CN">
			<body>
				<div className="flex flex-col min-h-screen">
					{/* 上方主体区域 */}
					<div className="flex flex-1">
						{/* 左侧边栏 */}
						<Sidebar />
						{/* 中间主内容区 */}
						<main className="flex-1 bg-white overflow-auto">
							{children}
						</main>
						{/* 右侧工具栏 */}
						<Header />
					</div>
					{/* 底部 */}
					<Footer />
				</div>
			</body>
		</html>
	)
}
