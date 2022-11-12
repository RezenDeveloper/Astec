import { useEffect, useState } from "react"

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    if(typeof window === 'undefined') return
    setIsMobile(window.innerWidth <= 768)
  }, [])

  return isMobile
}