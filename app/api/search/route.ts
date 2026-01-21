import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
	try {
		const body = await request.json()
		// TODO: 调用后端搜索 API
		return NextResponse.json({ success: true, data: [] })
	} catch (error) {
		return NextResponse.json(
			{ success: false, message: '搜索失败' },
			{ status: 500 }
		)
	}
}
