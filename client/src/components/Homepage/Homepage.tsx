import { Button } from '@/components/ui/button'
import { MainBanner } from './components'

import { useState } from 'react'

function Homepage() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MainBanner />

      <div>count is {count}</div>
      <Button size={'lg'} variant={'destructive'} onClick={() => setCount(count => count + 1)}>
        Click me
      </Button>
    </>
  )
}

export default Homepage
