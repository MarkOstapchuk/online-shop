interface ICart {
  items: ICartItem[]
  totalPrices: Map<string, number>
}
interface ICartItem {
  id: number
  product: IProductDetails
  quantity: number
}
interface ICartRequest {
  productId: number
  quantity: number
}
interface IUpdateQuantityRequest {
  quantity: number
}
