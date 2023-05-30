import { render, screen, fireEvent } from '@testing-library/react'
import { useRouter } from 'next/router'
import { api } from '@/lib/api'
import UpdateCurrency from '../src/app/admin/UpdateCurrency'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

jest.mock('@/lib/api', () => ({
  api: {
    get: jest.fn().mockResolvedValueOnce({
      data: [
        { id: 1, name: 'Um-Centavo', quantity: 10 },
        { id: 2, name: 'Cinco-Centavos', quantity: 5 },
      ],
    }),
    put: jest.fn().mockResolvedValueOnce({}),
  },
}))

jest.mock('js-cookie', () => ({
  get: jest.fn().mockReturnValue('mockToken'),
}))

describe('UpdateCurrency', () => {
  test('renders the form and submits it', async () => {
    const pushMock = jest.fn()
    useRouter.mockReturnValue({ push: pushMock })

    render(<UpdateCurrency />)

    const selectElement = screen.getByLabelText(/Select the Currency/i)
    const quantityInput = screen.getByLabelText(/Quantity/i)
    const updateButton = screen.getByText(/Update/i)

    fireEvent.change(selectElement, { target: { value: 'Um-Centavo' } })
    fireEvent.change(quantityInput, { target: { value: '5' } })
    fireEvent.click(updateButton)

    expect(api.get).toHaveBeenCalledTimes(1)
    expect(api.put).toHaveBeenCalledTimes(1)
    expect(api.put).toHaveBeenCalledWith(
      '/currency/1',
      { quantity: 5 },
      { headers: { Authorization: 'Bearer mockToken' } },
    )
    expect(pushMock).toHaveBeenCalledWith('/admin')
  })
})
