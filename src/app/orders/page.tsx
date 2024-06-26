import Container from '@/components/header/Container'
import NavList from '@/components/orders/NavList'
import Orders from '@/components/orders/Orders'

const Page = () => {
  return (
    <div className={'bg-gray-200 pt-6 min-h-[90vh] pb-12'}>
      <Container>
        <div className={'flex gap-10'}>
          <div className={'w-18p'}>
            <NavList />
          </div>
          <Orders />
        </div>
      </Container>
    </div>
  )
}

export default Page
