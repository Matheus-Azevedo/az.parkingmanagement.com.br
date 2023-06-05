import { iLinkToPage } from '@/interfaces/linkToPage'
import Link from 'next/link'

export function LinkToPage({ href, btnName }: iLinkToPage) {
  return (
    <Link
      href={href}
      className="btn btn-block btn-primary btn-block mb-4 rounded-full bg-gray-500 px-5 py-3 hover:bg-gray-400"
    >
      {' '}
      {btnName}{' '}
    </Link>
  )
}
