import axios from 'axios'

import { axiosWithAuth } from '@/config/interceptors'

class CartService {
  private BASE_URL = '/cart'
  //replace axios with axios interceptors auth
  //send cookie cartId
  async getCart() {
    return axiosWithAuth.get<ICart>(this.BASE_URL)
  }
  async addItemToCart(item: ICartRequest) {
    return axiosWithAuth.post<ICartItem>(`${this.BASE_URL}/add`, {
      item
    })
  }
  async updateQuantity(id: number, quantity: IUpdateQuantityRequest) {
    return axiosWithAuth.patch<ICartItem>(
      `${this.BASE_URL}/update`,
      {
        ...quantity
      },
      {
        params: {
          id
        }
      }
    )
  }
  async deleteCartItem(id: number) {
    return axiosWithAuth.delete<ICartItem>(`${this.BASE_URL}/delete`, {
      params: { id }
    })
  }
}

export default new CartService()
