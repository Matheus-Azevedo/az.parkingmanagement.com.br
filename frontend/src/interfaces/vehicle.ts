export interface iVehicle {
  id: string
  plaque: string
  model: string
  entry: Date
  exit?: Date
  totalTime?: number
  totalSpent?: number
  amountPaid?: number
  change?: number
  userId: number
}
