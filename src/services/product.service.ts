import { axiosClassic } from '@/config/interceptors'

class ProductService {
  private BASE_URL = '/product-service/products'

  async getProducts(size?: number, sort?: string, page?: number) {
    const response = await axiosClassic.get<IPage>(this.BASE_URL, {
      params: {
        sort,
        page,
        size
      }
    })
    return response.data
  }
  async getProductDetailsById(id: string) {
    const response = await axiosClassic.get<IProductDetails>(
      this.BASE_URL + '/' + id
    )
    return response.data
  }

  async createProduct(product: IProductRequest) {
    const response = await axiosClassic.post<IProductDetails>(this.BASE_URL, {
      product
    })
    return response.data
  }

  async deleteProductById(id: number) {
    const response = await axiosClassic.delete<IProductDetails>(
      this.BASE_URL + '/' + id
    )
    return response.data
  }

  async updateProductById(id: number, product: Partial<IProductRequest>) {
    const response = await axiosClassic.put<IProductDetails>(
      this.BASE_URL,
      {
        product
      },
      {
        params: {
          id
        }
      }
    )
    return response.data
  }
}
export default new ProductService()
