import type { PropsWithChildren, ReactNode } from 'react'

import { SidebarProvider } from '../../context/SidebarContext/SidebarContext'
import AppContainer from '../../components/layout/AppContainer/AppContainer'
import Footer from '../../components/layout/Footer/Footer'
import MobileSidebar from '../../components/layout/MobileSidebar/MobileSidebar'
import Navbar from '../../components/layout/Navbar/Navbar'
import PageHeader from '../../components/layout/PageHeader/PageHeader'
import PageTransition from '../../components/layout/PageTransition/PageTransition'
import Sidebar from '../../components/layout/Sidebar/Sidebar'

type DashboardLayoutProps = PropsWithChildren<{
  title: string
  subtitle: string
  actions?: ReactNode
}>

const DashboardLayout = ({ title, subtitle, actions, children }: DashboardLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="relative min-h-screen bg-slate-50 text-slate-900 lg:flex">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(37,99,235,0.05),_transparent_36%),radial-gradient(circle_at_bottom_left,_rgba(15,23,42,0.03),_transparent_30%)]" />
          <div className="hidden lg:block lg:flex-none">
          <Sidebar />
        </div>
        <MobileSidebar />
        <div className="flex min-h-screen flex-1 flex-col">
          <Navbar />
          <main className="relative z-10 flex-1 py-6 sm:py-8 lg:py-10">
            <AppContainer>
              <div className="space-y-6">
                <PageHeader title={title} subtitle={subtitle} actions={actions} />
                <PageTransition>{children}</PageTransition>
              </div>
            </AppContainer>
          </main>
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  )
}

export default DashboardLayout
