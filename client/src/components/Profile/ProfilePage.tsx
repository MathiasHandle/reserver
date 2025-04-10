import { Button } from '@/components/ui/button'
import { useLogoutUser, useUser } from '@/hooks'
import { useRouter } from '@tanstack/react-router'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'

// TODO make this route protected
function ProfilePage() {
  const { data: userData } = useUser()

  const router = useRouter()

  const { mutate: logoutUser } = useLogoutUser(() => {
    router.navigate({ to: '/' })
  })

  return (
    <>
      <h1 className="mt-8 mb-4 text-center text-2xl font-bold">Profile</h1>

      <aside className="m-auto w-fit">
        {userData && (
          <Card>
            <CardHeader>
              <h4></h4>
            </CardHeader>

            <CardContent>
              <div>
                <div>
                  <b>Email:</b> {userData.email}
                </div>
                <div>
                  <b>Name:</b> {userData.name}
                </div>
                <div>
                  <b>Surname:</b> {userData.surname}
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <Button
                variant={'destructive'}
                onClick={() => logoutUser()}
                className="mx-auto mt-4 font-bold"
              >
                Logout
              </Button>
            </CardFooter>
          </Card>
        )}
      </aside>

      <section></section>
    </>
  )
}

export default ProfilePage
