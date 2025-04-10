import { User } from '@/api/users/userTypes'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

type UserDetailProps = {
  userData: User
  onLogout: () => void
}

function UserDetail(props: UserDetailProps) {
  const { userData, onLogout } = props

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
          onClick={() => onLogout()}
          className="mx-auto mt-4 font-bold"
        >
          Logout
        </Button>
      </CardFooter>
    </Card>
  )
}

export default UserDetail
