import Link from 'next/link'

export function LinkHomePage({ props }: { props: string }) {
  const capitalizedProps = props.charAt(0).toUpperCase() + props.slice(1)
  return (
    <Link
      href={`/${props}`}
      className="btn btn-block btn-primary btn-block mb-4 rounded-full bg-gray-500 px-5 py-3 hover:bg-gray-400"
    >
      {' '}
      {capitalizedProps}{' '}
    </Link>
  )
}
