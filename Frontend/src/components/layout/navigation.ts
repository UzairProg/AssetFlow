import {
  Bell,
  BookMarked,
  Building2,
  ClipboardList,
  FileText,
  LayoutDashboard,
  RefreshCw,
  ScanLine,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Users,
  Warehouse,
  CalendarDays,
  Wrench,
  Activity,
  CircleGauge,
  FolderOpen,
  ClipboardCheck,
} from 'lucide-react'

export type NavigationGroup = {
  label: string
  icon: typeof LayoutDashboard
  href: string
  children?: Array<{ label: string; href: string }>
}

export const navigationGroups: NavigationGroup[] = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  {
    label: 'Organization',
    icon: Building2,
    href: '/organization',
    children: [
      { label: 'Departments', href: '/organization/departments' },
      { label: 'Categories', href: '/organization/categories' },
      { label: 'Employees', href: '/organization/employees' },
    ],
  },
  {
    label: 'Assets',
    icon: Warehouse,
    href: '/assets',
    children: [
      { label: 'Asset Directory', href: '/assets/directory' },
      { label: 'Register Asset', href: '/assets/registration' },
      { label: 'Allocation', href: '/assets/allocation' },
      { label: 'Transfers', href: '/assets/transfers' },
    ],
  },
  { label: 'Bookings', icon: CalendarDays, href: '/bookings' },
  { label: 'Maintenance', icon: Wrench, href: '/maintenance' },
  { label: 'Audit', icon: ScanLine, href: '/audit' },
  { label: 'Reports', icon: FileText, href: '/reports' },
  { label: 'Notifications', icon: Bell, href: '/notifications' },
  { label: 'Activity Logs', icon: Activity, href: '/activity' },
  { label: 'Settings', icon: Settings, href: '/settings' },
]

export const quickItems = [
  { label: 'Preferences', icon: SlidersHorizontal },
  { label: 'Security', icon: ShieldCheck },
  { label: 'Workspace', icon: CircleGauge },
  { label: 'Documents', icon: FolderOpen },
  { label: 'Approvals', icon: ClipboardCheck },
  { label: 'Notifications', icon: Bell },
  { label: 'Sync', icon: RefreshCw },
  { label: 'Audit Trail', icon: ClipboardList },
  { label: 'Bookmarks', icon: BookMarked },
  { label: 'Insights', icon: Users },
]
