export function InputPassword() {
  return (
    <div className="form-outline mb-4">
      <label className="form-label" htmlFor="password_field">
        Password
      </label>
      <input
        type="password"
        id="password_field"
        name="password_field"
        className="form-control w-full rounded-full"
      />
    </div>
  )
}
