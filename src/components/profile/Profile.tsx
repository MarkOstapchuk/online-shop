import Logout from '@/components/profile/Logout'

import { removeFromStorage } from '@/services/authToken.service'

const Profile = () => {
  return (
    <div className={'w-full'}>
      <Logout />
    </div>
  )
}

export default Profile
