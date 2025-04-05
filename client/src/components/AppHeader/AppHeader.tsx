import { useUser } from '@/hooks'
import { useStore } from '@/store'
import { Link } from '@tanstack/react-router'
import { Button } from '../ui/button'

const links = [
  {
    text: 'Home',
    to: '/',
  },
  {
    text: 'About',
    to: '/about',
  },
]

const AppHeader = () => {
  const setModal = useStore(state => state.setModal)

  function onLoginClick() {
    setModal('login', {
      isOpen: true,
    })
  }

  const { data: userData } = useUser()

  return (
    <>
      <div className="bg-card">
        <div className="container mx-auto flex items-center justify-between">
          <nav className="px-4 py-6">
            <ul className="container m-auto flex gap-2">
              {links.map((link, index) => (
                <li key={index}>
                  <Link to={link.to} className="[&.active]:font-bold">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            {userData?.email ? (
              <div className="font-bold">{userData.email}</div>
            ) : (
              <Button onClick={onLoginClick}>Login</Button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default AppHeader
