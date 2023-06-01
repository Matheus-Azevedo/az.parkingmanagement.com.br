export interface iLogin {
  email: string
  password: string
}

export interface iRegister extends iLogin {
  name: string
  role: 'admin' | 'user'
}
