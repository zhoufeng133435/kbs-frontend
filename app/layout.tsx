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
					<Header />
					<div className="flex flex-1">
						<Sidebar />
						<main className="flex-1 p-6 bg-gray-50">
							{children}
						</main>
					</div>
					<Footer />
				</div>
			</body>
		</html>
	)
}
