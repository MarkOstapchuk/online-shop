import Container from '@/components/header/Container'
import AllProducts from '@/components/main/AllProducts'

export default function Home() {
  return (
    <div>
      <Container>
        <div className={'text-second'}>Все товары</div>
        <AllProducts />
      </Container>
    </div>
  )
}
