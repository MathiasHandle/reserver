import { ProfilePage } from '@/components/Profile'
import { useUser } from '@/hooks'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data: user, isFetching: isFetchingUser } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!user && !isFetchingUser) {
      router.navigate({ to: '/' })
    }
  }, [user, isFetchingUser, router])

  return (
    <>
      {isFetchingUser && <div>Loading...</div>}

      {user && <ProfilePage />}
    </>
  )
}
