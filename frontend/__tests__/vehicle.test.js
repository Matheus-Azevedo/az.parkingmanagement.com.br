import { render, screen, fireEvent } from '@testing-library/react'
import { useRouter } from 'next/router'
import { api } from '@/lib/api'
import RegisterVehicle from '../src/app/admin/RegisterVehicle'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

jest.mock('@/lib/api', () => ({
  api: {
    post: jest.fn().mockResolvedValueOnce({}),
  },
}))

describe('RegisterVehicle', () => {
  test('renders the form and submits it', async () => {
    const pushMock = jest.fn()
    useRouter.mockReturnValue({ push: pushMock })

    render(<RegisterVehicle />)

    const plaqueInput = screen.getByLabelText(/Plaque/i)
    const modelInput = screen.getByLabelText(/Model/i)
    const registerButton = screen.getByText(/Register/i)

    fireEvent.change(plaqueInput, { target: { value: 'ABC123' } })
    fireEvent.change(modelInput, { target: { value: 'CAR' } })
    fireEvent.click(registerButton)

    expect(api.post).toHaveBeenCalledTimes(1)
    expect(api.post).toHaveBeenCalledWith(
      '/vehicles',
      { plaque: 'ABC123', model: 'CAR' },
      { headers: { Authorization: 'Bearer mockToken' } },
    )
    expect(pushMock).toHaveBeenCalledWith('/admin')
  })
})
