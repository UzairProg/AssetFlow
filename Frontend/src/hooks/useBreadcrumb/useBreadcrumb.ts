import { useMemo } from 'react'

const labelMap: Record<string, string> = {
  dashboard: 'Dashboard',
  organization: 'Organization',
  departments: 'Departments',
  categories: 'Categories',
  employees: 'Employees',
  assets: 'Assets',
  directory: 'Asset Directory',
  registration: 'Register Asset',
  allocation: 'Allocation',
  transfers: 'Transfers',
  bookings: 'Bookings',
  maintenance: 'Maintenance',
  audit: 'Audit',
  reports: 'Reports',
  notifications: 'Notifications',
  activity: 'Activity Logs',
  settings: 'Settings',
}

const useBreadcrumb = () => {
  const pathname = window.location.pathname

  return useMemo(() => {
    const segments = pathname.split('/').filter(Boolean)
    if (segments.length === 0) return [{ label: 'Dashboard', href: '/dashboard' }]

    const items = [{ label: 'Dashboard', href: '/dashboard' }]
    let currentPath = ''

    segments.forEach((segment) => {
      currentPath += `/${segment}`
      items.push({
        label: labelMap[segment] ?? segment.replace(/-/g, ' '),
        href: currentPath,
      })
    })

    return items
  }, [pathname])
}

export default useBreadcrumb