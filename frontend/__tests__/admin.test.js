import { render, screen } from '@testing-library/react'
import Admin from '../src/app/admin/page'
import { api } from '@/lib/api'
import { cookies } from 'next/headers'

jest.mock('@/lib/api', () => ({
  api: {
    getVehicles: jest.fn().mockResolvedValueOnce({
      data: [
        {
          id: 1,
          plaque: 'ABC123',
          model: 'CAR',
          entry: '2023-05-30T10:00:00Z',
        },
        {
          id: 2,
          plaque: 'DEF456',
          model: 'MOTO',
          entry: '2023-05-29T08:00:00Z',
        },
      ],
    }),
    getCurrency: jest.fn().mockResolvedValueOnce({
      data: [
        { id: 1, name: 'Currency 1', quantity: 10, type: 'COIN', value: 0.1 },
        { id: 2, name: 'Currency 2', quantity: 5, type: 'BANKNOTE', value: 10 },
      ],
    }),
  },
}))

jest.mock('next/headers', () => ({
  cookies: jest.fn().mockReturnValue({
    get: jest.fn().mockReturnValue('mockToken'),
  }),
}))

describe('Admin', () => {
  test('renders the admin dashboard', async () => {
    render(<Admin />)

    expect(api.getVehicles).toHaveBeenCalledTimes(1)
    expect(api.getVehicles).toHaveBeenCalledWith('/vehicles', {
      headers: {
        Authorization: 'Bearer mockToken',
      },
    })
    expect(api.getCurrency).toHaveBeenCalledTimes(1)
    expect(api.getCurrency).toHaveBeenCalledWith('/currency', {
      headers: {
        Authorization: 'Bearer mockToken',
      },
    })

    // Verify rendered content
    expect(screen.getByText(/Welcome admin/i)).toBeInTheDocument()
    expect(screen.getByText(/Register Vehicle/i)).toBeInTheDocument()
    expect(screen.getByText(/Update Currency Stock/i)).toBeInTheDocument()
    expect(screen.getByText(/Logout/i)).toBeInTheDocument()
    expect(screen.getByText(/Vehicles/i)).toBeInTheDocument()
    expect(screen.getByText(/Currency Stock/i)).toBeInTheDocument()

    // Verify vehicle data
    expect(screen.getByText(/ABC123/i)).toBeInTheDocument()
    expect(screen.getByText(/CAR/i)).toBeInTheDocument()
    expect(screen.getByText(/29\/05\/2023 08:00/i)).toBeInTheDocument()
    expect(screen.getByText(/29\/05\/2023 15:00/i)).toBeInTheDocument()
    expect(screen.getByText(/R\$ 14,00/i)).toBeInTheDocument()

    // Verify currency data
    expect(screen.getByText(/Currency 1/i)).toBeInTheDocument()
    expect(screen.getByText(/Quantity: 10/i)).toBeInTheDocument()
    expect(screen.getByText(/Currency 2/i)).toBeInTheDocument()
    expect(screen.getByText(/Quantity: 5/i)).toBeInTheDocument()
  })

  test('renders "You are not logged in!" if there is no token', () => {
    cookies().get.mockReturnValue(undefined)
    render(<Admin />)

    expect(screen.getByText(/You are not logged in!/i)).toBeInTheDocument()
  })
})
