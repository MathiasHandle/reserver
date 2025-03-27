import { Link } from '@tanstack/react-router'

const AppHeader = () => {
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

  return (
    <>
      <nav className="py-6 px-4  bg-card">
        <ul className="container flex gap-2 m-auto">
          {links.map((link, index) => (
            <li key={index}>
              <Link to={link.to} className="[&.active]:font-bold">
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}

export default AppHeader
