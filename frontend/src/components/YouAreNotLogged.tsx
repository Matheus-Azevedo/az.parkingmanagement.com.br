export function YouAreNotLogged() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-center text-4xl font-bold">
        You are not logged in or not have account.
      </h1>
      <h1 className="text-center text-4xl font-bold">
        Please login or register.
      </h1>
    </div>
  )
}
