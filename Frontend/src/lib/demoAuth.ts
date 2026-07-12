export const DEMO_DASHBOARD_PATH = '/dashboard'

export const goToPath = (path: string) => {
  if (window.location.pathname === path) return

  window.history.pushState({}, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

export const goToDemoDashboard = () => {
  goToPath(DEMO_DASHBOARD_PATH)
}
