import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Every time the route changes (switching tabs, opening a page) start from the top.
// Without this the SPA keeps the previous page's scroll position.
export const ScrollToTop = () => {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    // "instant" so the global `scroll-behavior: smooth` doesn't animate from the old position
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [pathname])

  return null
}
