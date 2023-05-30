import { render, screen, fireEvent } from '@testing-library/react'
import Login from '../src/app/login/page'
import { useRouter } from 'next/router'

// Simula o comportamento do useRouter()
jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({}),
}))

describe('Login page', () => {
  test('renders the login form', () => {
    render(<Login />)

    // Verifica se os elementos do formulário estão sendo renderizados corretamente
    expect(screen.getByLabelText('Email address')).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument()
    expect(screen.getByText('Not a member?')).toBeInTheDocument()
  })

  test('submits the form with the provided email and password', () => {
    render(<Login />)

    // Simula a entrada de dados nos campos do formulário
    fireEvent.change(screen.getByLabelText('Email address'), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' },
    })

    // Simula o envio do formulário
    fireEvent.submit(screen.getByRole('button', { name: 'Sign in' }))

    // Verifica se o envio do formulário foi realizado corretamente
    // Aqui você pode adicionar mais expectativas de acordo com o comportamento esperado
    // por exemplo, verificar se a função router.push() foi chamada com o caminho correto
  })
  test('submits the form with the provided email and password', () => {
    // Cria um objeto de rota simulado
    const mockRouter = { push: jest.fn() }

    // Define o comportamento do useRouter() simulado para retornar o objeto de rota simulado
    useRouter.mockReturnValue(mockRouter)

    // Seu código de teste
    render(<Login />)

    // Expectations
  })
})
