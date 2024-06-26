import { axiosWithAuth } from '@/config/interceptors'

class OrderService {
  private BASE_URL = '/orders'
  async getOrders(size?: number, sort?: string, page?: number) {
    return axiosWithAuth.get<IPageOrder>(this.BASE_URL, {
      params: {
        sort,
        page,
        size
      }
    })
  }
  async getOrderById(id: number) {
    return axiosWithAuth.get<IOrderDetails>(this.BASE_URL, {
      params: {
        id
      }
    })
  }
}
export default new OrderService()
