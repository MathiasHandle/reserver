import ImgJPG from '@/assets/main-banner.jpg'
import ImgWebp from '@/assets/main-banner.webp'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

function MainBanner() {
  return (
    <div className="relative">
      <picture>
        <source src={ImgWebp} type="image/webp" />
        <img className="" src={ImgJPG} alt="Main Banner" />
      </picture>

      <Card className="absolute top-0 left-0 z-10 h-full px-6 py-32">
        <CardContent className="flex h-full w-full flex-col justify-between gap-6">
          <h1 className="text-5xl leading-16">
            Join us for
            <br />
            exciting
            <br />
            experiences
          </h1>

          <span className="block">Plan your event journey with us</span>

          <Button variant={'action'}>Join us</Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default MainBanner
