import { Link } from '@tanstack/react-router'
import footerLinksMock from './footerLinksMock'

function AppFooter() {
  return (
    <div className="bg-card">
      <div className="container mx-auto px-4 py-12 sm:px-0">
        <div className="mx-auto grid w-fit grid-cols-2 gap-8 text-center sm:grid-cols-3 sm:gap-x-16">
          {footerLinksMock.map(item => (
            <div key={item.title} className="">
              <h4 className="text-lg font-bold">{item.title}</h4>

              <ul>
                {item.links.map(link => (
                  <Link to={link.path} key={link.name}>
                    <li key={link.name}>{link.name}</li>
                  </Link>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AppFooter
