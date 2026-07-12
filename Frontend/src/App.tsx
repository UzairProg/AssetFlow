import { useEffect, useState } from 'react'

import { motion } from 'framer-motion'
import { LayoutDashboard, LogIn } from 'lucide-react'

import AuthButton from './components/auth/AuthButton'
import AuthCard from './components/auth/AuthCard'
import AuthFooter from './components/auth/AuthFooter'
import AuthHeader from './components/auth/AuthHeader'
import AuthIllustration from './components/auth/AuthIllustration'
import LandingPage from './pages/Landing/LandingPage'
import DashboardPage from './pages/dashboard/DashboardPage'
import OrganizationOverview from './pages/organization/overview/OverviewPage'
import PlaceholderPage from './pages/Placeholder/PlaceholderPage'
import ForgotPassword from './pages/auth/ForgotPassword/ForgotPassword'
import Login from './pages/auth/Login/Login'
import ResetPassword from './pages/auth/ResetPassword/ResetPassword'
import Signup from './pages/auth/Signup/Signup'
import TwoFactor from './pages/auth/TwoFactor/TwoFactor'
import VerifyEmail from './pages/auth/VerifyEmail/VerifyEmail'
import { goToPath } from './lib/demoAuth'

const usePathname = () => {
  const [pathname, setPathname] = useState(window.location.pathname)

  useEffect(() => {
    const onPopState = () => setPathname(window.location.pathname)

    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  return pathname
}

const App = () => {
  const pathname = usePathname()

  if (pathname === '/' || pathname === '/landing') return <LandingPage />
  if (pathname === '/login') return <Login />
  if (pathname === '/signup') return <Signup />
  if (pathname === '/forgot-password') return <ForgotPassword />
  if (pathname === '/verify-email') return <VerifyEmail />
  if (pathname === '/reset-password') return <ResetPassword />
  if (pathname === '/two-factor') return <TwoFactor />
  if (pathname === '/dashboard') return <DashboardPage />
  if (pathname === '/organization' || pathname.startsWith('/organization/')) return <OrganizationOverview />
  if (pathname.startsWith('/assets')) return <PlaceholderPage title="Assets" subtitle="Asset management pages are coming soon." />
  if (pathname.startsWith('/bookings')) return <PlaceholderPage title="Bookings" subtitle="Bookings pages are coming soon." />
  if (pathname.startsWith('/maintenance')) return <PlaceholderPage title="Maintenance" subtitle="Maintenance pages are coming soon." />
  if (pathname.startsWith('/audit')) return <PlaceholderPage title="Audit" subtitle="Audit pages are coming soon." />
  if (pathname.startsWith('/reports')) return <PlaceholderPage title="Reports" subtitle="Reports pages are coming soon." />
  if (pathname.startsWith('/notifications')) return <PlaceholderPage title="Notifications" subtitle="Notifications pages are coming soon." />
  if (pathname.startsWith('/activity')) return <PlaceholderPage title="Activity Logs" subtitle="Activity log pages are coming soon." />
  if (pathname.startsWith('/settings')) return <PlaceholderPage title="Settings" subtitle="Settings pages are coming soon." />

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-md space-y-6"
      >
        <AuthHeader
          title="Page not found"
          subtitle="The requested experience is not available. Use the links below to continue."
        />
        <AuthIllustration />
        <AuthCard>
          <div className="space-y-4 text-center">
            <p className="text-sm text-slate-500">
              Return to the enterprise authentication flow or open the demo dashboard.
            </p>
            <div className="space-y-3">
              <AuthButton type="button" fullWidth onClick={() => goToPath('/login')}>
                <LogIn className="h-4 w-4" />
                Go to Login
              </AuthButton>
              <AuthButton type="button" variant="secondary" fullWidth onClick={() => goToPath('/dashboard')}>
                <LayoutDashboard className="h-4 w-4" />
                Open Demo Dashboard
              </AuthButton>
            </div>
          </div>
        </AuthCard>
        <AuthFooter />
      </motion.div>
    </main>
  )
}

export default App