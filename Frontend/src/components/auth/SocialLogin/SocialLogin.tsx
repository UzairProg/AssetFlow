import { SiGoogle } from 'react-icons/si'
import { Monitor } from 'lucide-react'

import AuthButton from '../AuthButton/AuthButton'

const SocialLogin = () => {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <AuthButton type="button" variant="secondary" fullWidth disabled title="Coming soon">
        <SiGoogle className="h-4 w-4" />
        Google
      </AuthButton>
      <AuthButton type="button" variant="secondary" fullWidth disabled title="Coming soon">
        <Monitor className="h-4 w-4" />
        Microsoft
      </AuthButton>
    </div>
  )
}

export default SocialLogin
