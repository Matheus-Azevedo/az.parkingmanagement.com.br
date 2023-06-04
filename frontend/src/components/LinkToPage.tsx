import Link from 'next/link'

interface iLinkToPage {
  prop1: string
  prop2: string
}

export function LinkToPage({ prop1, prop2 }: iLinkToPage) {
  return (
    <Link
      href={prop1}
      className="btn btn-block btn-primary btn-block mb-4 rounded-full bg-gray-500 px-5 py-3 hover:bg-gray-400"
    >
      {' '}
      {prop2}{' '}
    </Link>
  )
}
