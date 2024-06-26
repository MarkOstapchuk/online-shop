import { PropsWithChildren } from 'react'

const Container = ({ children }: PropsWithChildren) => {
  return <div className={'max-w-85p mx-auto bg-transparent'}>{children}</div>
}

export default Container
