export interface iUser {
  name: string
  email: string
  password: string
  credit?: number
  role: 'admin' | 'user'
}
