import type { FC, ReactNode } from 'react'
import ToastProvider from '../Toast/ToastProvider'
import { ConfirmProvider } from '../ConfirmDialog/ConfirmDialog'
import CommandPalette from '../CommandPalette/CommandPalette'
import HelpDrawer from '../HelpDrawer/HelpDrawer'
import { RealtimeProvider } from '../../../context/RealtimeContext'

const AppShell: FC<{ children?: ReactNode }> = ({ children }) => {
  return (
    <ToastProvider>
      <ConfirmProvider>
        <RealtimeProvider>
          {children}
          <CommandPalette />
          <HelpDrawer />
        </RealtimeProvider>
      </ConfirmProvider>
    </ToastProvider>
  )
}

export default AppShell
