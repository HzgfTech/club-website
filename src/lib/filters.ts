import { useState } from 'react'

export function useFilters() {
  const [params, setParams] = useState(() => new URLSearchParams(location.search))
  const update = (field: string, value: string) => {
    const next = new URLSearchParams(params)
    if (value) next.set(field, value); else next.delete(field)
    setParams(next)
    history.replaceState(null, '', location.pathname + (next.size ? `?${next}` : ''))
  }
  const clear = () => { setParams(new URLSearchParams()); history.replaceState(null, '', location.pathname) }
  return { params, update, clear }
}
