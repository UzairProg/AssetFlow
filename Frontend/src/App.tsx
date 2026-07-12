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
import AppShell from './components/global/AppShell/AppShell'

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

  // Auth and landing pages - render without app shell
  if (pathname === '/' || pathname === '/landing') return <LandingPage />
  if (pathname === '/login') return <Login />
  if (pathname === '/signup') return <Signup />
  if (pathname === '/forgot-password') return <ForgotPassword />
  if (pathname === '/verify-email') return <VerifyEmail />
  if (pathname === '/reset-password') return <ResetPassword />
  if (pathname === '/two-factor') return <TwoFactor />

  // Determine page for non-auth routes
  let page: JSX.Element | null = null

  if (pathname === '/dashboard') page = <DashboardPage />
  else if (pathname === '/organization' || pathname.startsWith('/organization/')) page = <OrganizationOverview />
  else if (pathname === '/assets' || pathname === '/assets/overview') page = <AssetOverview />
  else if (pathname === '/assets/directory' || pathname.startsWith('/assets/directory')) page = <AssetDirectory />
  else if (pathname === '/allocation' || pathname.startsWith('/allocation/')) {
    if (pathname === '/allocation') page = <AllocationOverview />
    else if (pathname === '/allocation/allocate') page = <AllocatePage />
    else if (pathname.startsWith('/allocation/transfers')) page = <TransfersList />
    else page = <AllocationOverview />
  } else if (pathname === '/booking' || pathname.startsWith('/booking/')) {
    if (pathname === '/booking') page = <BookingDashboard />
    else if (pathname === '/booking/directory') page = <ResourceDirectory />
    else if (pathname === '/booking/calendar') page = <BookingCalendar />
    else if (pathname === '/booking/create') page = <CreateBooking />
    else if (pathname.startsWith('/booking/details')) page = <BookingDetails />
    else if (pathname.startsWith('/booking/history')) page = <BookingHistory />
    else page = <BookingDashboard />
  } else if (pathname.startsWith('/bookings')) page = <PlaceholderPage title="Bookings" subtitle="Bookings pages are coming soon." />
  else if (pathname.startsWith('/maintenance')) page = <PlaceholderPage title="Maintenance" subtitle="Maintenance pages are coming soon." />
  else if (pathname.startsWith('/audit')) page = <PlaceholderPage title="Audit" subtitle="Audit pages are coming soon." />
  else if (pathname.startsWith('/reports')) page = <PlaceholderPage title="Reports" subtitle="Reports pages are coming soon." />
  else if (pathname.startsWith('/notifications')) page = <PlaceholderPage title="Notifications" subtitle="Notifications pages are coming soon." />
  else if (pathname.startsWith('/activity')) page = <PlaceholderPage title="Activity Logs" subtitle="Activity log pages are coming soon." />
  else if (pathname.startsWith('/settings')) page = <PlaceholderPage title="Settings" subtitle="Settings pages are coming soon." />

  if (!page) {
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
              <p className="text-sm text-slate-500">Return to the enterprise authentication flow or open the demo dashboard.</p>
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

  return <AppShell>{page}</AppShell>
}

export default App
