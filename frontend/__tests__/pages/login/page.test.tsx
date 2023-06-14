import React from 'react'
import { render, screen } from '@testing-library/react'
import Login from '@/app/login/page'

describe('Login page', () => {
  test('should render the login page', () => {
    render(<Login />)

    const title = screen.getByText(/Login/i)
    const emailInput = screen.getByLabelText(/Email/i)
    const passwordInput = screen.getByLabelText(/Password/i)
    const submitButton = screen.getByRole('button', { name: /Login/i })

    expect(title).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
  })
})
