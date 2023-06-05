export function ButtonSubmit({ btnName }: { btnName: string }) {
  return (
    <div className="text-center">
      <button
        type="submit"
        className="btn btn-block btn-primary btn-block mb-4 rounded-full bg-gray-500 px-5 py-3 hover:bg-gray-400"
      >
        {btnName}
      </button>
    </div>
  )
}
