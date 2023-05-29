export interface iVehicle {
  id: number
  plaque: string
  model: string
  entry: Date
  exit?: Date
  totalSpent?: number
  AmountPaid?: number
  userId: number
}
