import { render, screen } from '@testing-library/react'
import Home from '../src/app/page'

describe('Home', () => {
  test('renders the welcome message', () => {
    render(<Home />)
    const welcomeMessage = screen.getByText(/Welcome to Parking Management!/i)
    expect(welcomeMessage).toBeInTheDocument()
  })

  test('renders the login link', () => {
    render(<Home />)
    const loginLink = screen.getByText(/Login/i)
    expect(loginLink).toBeInTheDocument()
  })

  test('renders the register link', () => {
    render(<Home />)
    const registerLink = screen.getByText(/Register/i)
    expect(registerLink).toBeInTheDocument()
  })
})
