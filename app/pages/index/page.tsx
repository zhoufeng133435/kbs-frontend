'use client'

import React from 'react'

export default function Home() {
	// 模拟数据
	const stats = {
		assets: [
			{ label: '知识条目', value: '12,840', unit: '条' },
			{ label: '文档数', value: '456', unit: '份' },
			{ label: '向量条数', value: '89.2', unit: '万条' },
			{ label: '标签数', value: '128', unit: '个' },
		],
		behavior: [
			{ label: '累计提问', value: '25,600', unit: '次' },
			{ label: '最近7天提问', value: '1,240', unit: '次' },
			{ label: '常用知识', value: '89', unit: '条' },
			{ label: 'AI 命中率', value: '94.5', unit: '%' },
		],
		ai: [
			{ label: '相似知识关联', value: '45,200', unit: '组' },
			{ label: '自动总结生成', value: '8,420', unit: '次' },
			{ label: '向量检索耗时', value: '12', unit: 'ms' },
		],
	}

	const StatCard = ({ label, value, unit }: { label: string; value: string; unit: string }) => (
		<div className="bg-white p-6 rounded-2xl border border-custom-border shadow-sm hover:shadow-md transition-shadow">
			<p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-2">{label}</p>
			<div className="flex items-baseline gap-1">
				<span className="text-2xl font-bold text-gray-900">{value}</span>
				<span className="text-gray-400 text-xs">{unit}</span>
			</div>
		</div>
	)

	const SectionTitle = ({ title }: { title: string }) => (
		<div className="flex items-center gap-2 mb-6">
			<div className="w-1 h-4 bg-blue-600 rounded-full" />
			<h2 className="text-sm font-bold text-gray-800 uppercase tracking-widest">{title}</h2>
		</div>
	)

	return (
		<div className="w-full space-y-8">
			{/* 顶部欢迎语 */}
			<div className="mb-6 p-4">
				<h1 className="text-xl font-bold text-gray-900 mb-1">知识库概览</h1>
				<p className="text-gray-500 text-xs">实时掌握系统核心资产与 AI 运行效率</p>
			</div>

			{/* 知识资产统计 */}
			<section className="px-4">
				<SectionTitle title="知识资产统计" />
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{stats.assets.map((s, i) => (
						<StatCard key={i} {...s} />
					))}
				</div>
			</section>

			{/* 使用行为统计 */}
			<section className="px-4">
				<SectionTitle title="使用行为统计" />
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{stats.behavior.map((s, i) => (
						<StatCard key={i} {...s} />
					))}
				</div>
			</section>

			{/* AI 特有统计 */}
			<section className="px-4 pb-8">
				<SectionTitle title="AI 特有统计" />
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{stats.ai.map((s, i) => (
						<StatCard key={i} {...s} />
					))}
				</div>
			</section>
		</div>
	)
}
