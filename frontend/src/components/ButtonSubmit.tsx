export function ButtonSubmit({ props }: { props: string }) {
  return (
    <button
      type="submit"
      className="btn btn-block btn-primary btn-block mb-4 rounded-full bg-gray-500 px-5 py-3 hover:bg-gray-400"
    >
      {props}
    </button>
  )
}
