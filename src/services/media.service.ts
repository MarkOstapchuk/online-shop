import { axiosClassic } from '@/config/interceptors'
import { server_path } from '@/config/server'

class MediaService {
  private BASE_URL = '/public'

  getImage(src: string) {
    return `${server_path}${this.BASE_URL}/img/${src}`
  }
}
export default new MediaService()
