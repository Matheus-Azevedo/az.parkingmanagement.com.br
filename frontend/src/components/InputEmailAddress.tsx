export function InputEmailAddress() {
  return (
    <div className="form-outline mb-4">
      <label className="form-label" htmlFor="email_field">
        Email address
      </label>
      <input
        type="email"
        id="email_field"
        name="email_field"
        className="form-control w-full rounded-full"
      />
    </div>
  )
}
