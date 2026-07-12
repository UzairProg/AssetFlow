import { useEffect, useState } from 'react'

const getViewport = () => ({
  isMobile: window.matchMedia('(max-width: 767px)').matches,
  isTablet: window.matchMedia('(min-width: 768px) and (max-width: 1023px)').matches,
  isDesktop: window.matchMedia('(min-width: 1024px)').matches,
})

const useResponsive = () => {
  const [viewport, setViewport] = useState(getViewport)

  useEffect(() => {
    const onResize = () => setViewport(getViewport())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return viewport
}

export default useResponsive