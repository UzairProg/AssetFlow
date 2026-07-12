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
import AssetOverview from './pages/assets/overview/AssetOverview'
import AllocationOverview from './pages/allocation/overview/AllocationOverview'
import AllocatePage from './pages/allocation/allocate/AllocatePage'
import TransfersList from './pages/allocation/transfers/list/TransfersList'
import AssetDirectory from './pages/assets/directory/AssetDirectory'
import PlaceholderPage from './pages/Placeholder/PlaceholderPage'
import BookingDashboard from './pages/booking/dashboard/BookingDashboard'
import ResourceDirectory from './pages/booking/directory/ResourceDirectory'
import BookingCalendar from './pages/booking/calendar/BookingCalendar'
import CreateBooking from './pages/booking/create/CreateBooking'
import BookingDetails from './pages/booking/details/BookingDetails'
import BookingHistory from './pages/booking/history/BookingHistory'
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
  if (pathname === '/assets' || pathname === '/assets/overview') return <AssetOverview />
  if (pathname === '/assets/directory' || pathname.startsWith('/assets/directory')) return <AssetDirectory />
  if (pathname === '/allocation' || pathname.startsWith('/allocation/')) {
    if (pathname === '/allocation') return <AllocationOverview />
    if (pathname === '/allocation/allocate') return <AllocatePage />
    if (pathname.startsWith('/allocation/transfers')) return <TransfersList />
    return <AllocationOverview />
  }
  if (pathname === '/booking' || pathname.startsWith('/booking/')) {
    if (pathname === '/booking') return <BookingDashboard />
    if (pathname === '/booking/directory') return <ResourceDirectory />
    if (pathname === '/booking/calendar') return <BookingCalendar />
    if (pathname === '/booking/create') return <CreateBooking />
    if (pathname.startsWith('/booking/details')) return <BookingDetails />
    if (pathname.startsWith('/booking/history')) return <BookingHistory />
    return <BookingDashboard />
  }
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