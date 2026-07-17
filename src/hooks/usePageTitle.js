import { useEffect } from 'react'

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — Mising Archives` : 'Mising Archives'
    return () => { document.title = 'Mising Archives' }
  }, [title])
}