interface ErrorProps {
	message?: string
}

export default function Error({ message = '出错了' }: ErrorProps) {
	return (
		<div className="text-center py-12">
			<p className="text-red-500">{message}</p>
		</div>
	)
}
