import { render, screen } from '@testing-library/react'
import User from '../src/app/user/page'

jest.mock('@/lib/api', () => ({
  api: {
    get: jest.fn().mockResolvedValueOnce({
      data: [
        {
          id: 1,
          plaque: 'ABC123',
          model: 'CAR',
          entry: '2023-05-29T10:00:00Z',
          AmountPaid: 20.0,
        },
      ],
    }),
  },
}))

jest.mock('next/headers', () => ({
  cookies: {
    get: jest.fn().mockReturnValue('mockToken'),
  },
}))

describe('User', () => {
  test('renders the welcome message with user name', async () => {
    render(<User />)
    await screen.findByText(/Welcome user/i)
    expect(screen.getByText(/Welcome user/i)).toBeInTheDocument()
  })

  test('renders the logout link', async () => {
    render(<User />)
    await screen.findByText(/Logout/i)
    expect(screen.getByText(/Logout/i)).toBeInTheDocument()
  })

  test('renders the vehicle information', async () => {
    render(<User />)
    await screen.findByText(/Plaque:/i)
    expect(screen.getByText(/Plaque:/i)).toBeInTheDocument()
    expect(screen.getByText(/Model:/i)).toBeInTheDocument()
    expect(screen.getByText(/Price per Hour:/i)).toBeInTheDocument()
    expect(screen.getByText(/Entry:/i)).toBeInTheDocument()
    expect(screen.getByText(/Exit:/i)).toBeInTheDocument()
    expect(screen.getByText(/Total time:/i)).toBeInTheDocument()
    expect(screen.getByText(/Total Spent:/i)).toBeInTheDocument()
  })
})
