import { User } from '@/api/users/userTypes'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { useLogoutUser } from '@/hooks'

type UserDetailProps = {
  userData: User
}

function UserDetail(props: UserDetailProps) {
  const { userData } = props

  const { mutate: logoutUser } = useLogoutUser()

  return (
    <Card>
      <CardHeader>
        <h4 className="text-center text-lg font-bold">User</h4>
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
  )
}

export default UserDetail
