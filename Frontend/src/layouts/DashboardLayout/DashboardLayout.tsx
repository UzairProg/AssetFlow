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
      <div className="min-h-screen bg-slate-50 text-slate-900 lg:flex">
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <MobileSidebar />
        <div className="flex min-h-screen flex-1 flex-col">
          <Navbar />
          <main className="flex-1 py-5 sm:py-6">
            <AppContainer>
              <div className="space-y-5">
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
