import { MainBanner } from './components'

import { RegistrationForm } from '../Auth'

function Homepage() {
  return (
    <>
      <MainBanner />

      <div className="hidden">
        <RegistrationForm />
      </div>
    </>
  )
}

export default Homepage
