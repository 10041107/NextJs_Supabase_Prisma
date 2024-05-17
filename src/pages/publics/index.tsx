import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function PublicPage() {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/auth/me')
      if (response.ok) {
        const data = await response.json()
        if (data.role === 'public' || data.role === 'admin') {
          setIsAuthorized(true)
        } else {
          router.push('/login')
        }
      } else {
        router.push('/login')
      }
    }
    fetchData()
  }, [router])

  if (!isAuthorized) return <div>Loading...</div>return (
    <div>
      <h1>Public Page</h1>
      {/* Public page content */}
    </div>
  )
}