import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
	try {
		const formData = await request.formData()
		// TODO: 调用后端文档上传 API
		return NextResponse.json({ success: true, message: '上传成功' })
	} catch (error) {
		return NextResponse.json(
			{ success: false, message: '上传失败' },
			{ status: 500 }
		)
	}
}
