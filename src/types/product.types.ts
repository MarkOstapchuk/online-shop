interface IProduct {
  id: number
  name: string
  images: string[]
  description: string
  price: IPrice
  netWeightInKg: number
  categories: ICategory[]
}

interface IPrice {
  amount: number
  currency: string
}

interface ICategory {
  name: string
  count: number
}

interface IProductDetails extends IProduct {
  lengthInMeters: number
  widthInMeters: number
  heightInMeters: number
  grossWeightInKg: number
}

type IProductRequest = Exclude<IProductDetails, 'id' & 'categories'> & {
  categoryId: number[]
}

interface ISort {
  empty: boolean
  sorted: boolean
  unsorted: boolean
}

interface IPageable {
  pageNumber: number
  pageSize: number
  sort: ISort
  offset: number
  paged: boolean
  unpaged: boolean
}

interface IPage {
  content: IProduct[]
  pageable: IPageable
  last: boolean
  totalPages: number
  totalElements: number
  first: boolean
  size: number
  number: number
  sort: ISort
  numberOfElements: number
  empty: boolean
}
