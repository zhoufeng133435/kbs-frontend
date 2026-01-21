import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
	try {
		// TODO: 调用后端文档列表 API
		return NextResponse.json({ success: true, data: [] })
	} catch (error) {
		return NextResponse.json(
			{ success: false, message: '获取文档列表失败' },
			{ status: 500 }
		)
	}
}

export async function DELETE(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url)
		const id = searchParams.get('id')
		// TODO: 调用后端删除文档 API
		return NextResponse.json({ success: true, message: '删除成功' })
	} catch (error) {
		return NextResponse.json(
			{ success: false, message: '删除失败' },
			{ status: 500 }
		)
	}
}
