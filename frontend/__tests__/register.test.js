import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Register from '../src/app/register/page'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'

jest.mock('@/lib/api', () => ({
  api: {
    post: jest.fn().mockResolvedValue({
      data: {
        token: 'mockToken',
      },
    }),
  },
}))

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

describe('Register', () => {
  test('renders the registration form', () => {
    render(<Register />)
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Role/i)).toBeInTheDocument()
    expect(screen.getByText(/Register/i)).toBeInTheDocument()
  })

  test('submits the registration form', async () => {
    const mockPush = jest.fn()
    useRouter.mockReturnValue({ push: mockPush })

    render(<Register />)

    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { value: 'John Doe' },
    })
    fireEvent.change(screen.getByLabelText(/Email address/i), {
      target: { value: 'john@example.com' },
    })
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'password' },
    })
    fireEvent.change(screen.getByLabelText(/Role/i), {
      target: { value: 'user' },
    })

    fireEvent.click(screen.getByText(/Register/i))

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/register', {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password',
        role: 'user',
      })
      expect(mockPush).toHaveBeenCalledWith('/login')
    })
  })
})
