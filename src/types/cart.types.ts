interface ICart {
  items: ICartItem[]
  totalPrices: Map<string, number>
}
interface ICartItem {
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
