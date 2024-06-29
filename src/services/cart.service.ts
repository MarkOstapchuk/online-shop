import { axiosClassic, axiosWithAuth } from '@/config/interceptors'

import { AuthService } from '@/services/auth.service'
import { getAccessToken, getRefreshToken } from '@/services/authToken.service'

class CartService {
  private readonly axios: typeof axiosClassic | typeof axiosWithAuth
  private BASE_URL = '/user-service/cart'
  //send cookie cartId
  constructor() {
    const token = getRefreshToken()

    this.axios = token ? axiosWithAuth : axiosClassic
    console.log(
      `Using Axios instance: ${token ? 'axiosWithAuth' : 'axiosClassic'}`
    )
  }
  async getCart() {
    const data = await this.axios.get<ICart>(this.BASE_URL)
    return data.data
  }
  async addItemToCart(item: ICartRequest) {
    return this.axios.post<ICartItem>(`${this.BASE_URL}/add`, {
      ...item
    })
  }
  async updateQuantity(id: number, quantity: IUpdateQuantityRequest) {
    const data = await this.axios.patch<ICart>(
      `${this.BASE_URL}/update/${id}`,
      {
        ...quantity
      }
    )
    return data.data
  }
  async deleteCartItem(id: number) {
    const data = await this.axios.delete<ICart>(`${this.BASE_URL}/delete/${id}`)
    return data.data
  }
}

export default new CartService()
