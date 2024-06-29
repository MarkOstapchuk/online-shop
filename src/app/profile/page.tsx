import Container from '@/components/header/Container'
import NavList from '@/components/orders/NavList'
import Profile from '@/components/profile/Profile'

const Page = () => {
  return (
    <div className={'bg-bg-gray pt-6 min-h-[90vh] pb-12'}>
      <Container>
        <div className={'flex gap-10'}>
          <div className={'w-18p'}>
            <NavList />
          </div>
          <Profile />
        </div>
      </Container>
    </div>
  )
}

export default Page
