import type { Metadata } from 'next'
import './globals.css'

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
			<body>{children}</body>
		</html>
	)
}
