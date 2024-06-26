interface IPageOrder extends Omit<IPage, 'content'> {
  content: IOrder[]
}
enum deliveryStatus {
  ORDER_RECEIVED,
  ORDER_PROCESSING,
  IN_TRANSIT,
  DELIVERED,
  CANCELLED
}
enum deliveryType {
  STANDARD,
  EXPRESS,
  SAME_DAY,
  NEXT_DAY,
  SCHEDULED,
  IN_STORE_PICKUP
}

interface IOrder {
  id: number
  userId: string
  status: deliveryStatus
  items: IOrderItem[]
}

interface IOrderItem {
  orderItem: IProductDetails
  quantity: number
}
interface IOrderDetails {
  id: number
  userId: string
  delivery: IDelivery
  address: IAddress
  items: IOrderItem[]
  createdAt: Date
}
interface IDelivery {
  type: deliveryType
  status: deliveryStatus
  fee: IFee
}
interface IAddress {
  city: string
  country: string
  streetAddress: string
  apartment: string
}
interface IFee {
  amount: number
  currency: string
}
