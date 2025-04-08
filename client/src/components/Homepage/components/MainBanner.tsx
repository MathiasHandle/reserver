import ImgJPG from '@/assets/main-banner.jpg'
import ImgWebp from '@/assets/main-banner.webp'
import { LoginModal, RegistrationModal } from '@/components/Auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useStore } from '@/store'

function MainBanner() {
  const modals = useStore(state => state.modals)
  const setModal = useStore(state => state.setModal)

  return (
    <div className="relative mt-4">
      <picture className="hidden sm:block">
        <source src={ImgWebp} type="image/webp" />
        <img className="rounded-xl" src={ImgJPG} alt="Main Banner" />
      </picture>

      <Card className="py-5 sm:absolute sm:top-0 sm:left-0 sm:z-10 sm:h-full sm:p-2 md:p-4 xl:px-6 xl:py-20">
        <CardContent className="flex h-full w-full flex-col justify-between gap-6">
          <h1 className="text-3xl leading-11 font-bold sm:text-2xl sm:leading-9 md:text-3xl lg:text-5xl lg:leading-16">
            Join us for
            <br />
            exciting
            <br />
            experiences
          </h1>

          <span className="block">Concerts, workshops, meetings and more</span>

          {/* TODO when user is logged in redirect to events page */}
          <Button
            variant={'action'}
            onClick={() =>
              setModal('registration', {
                isOpen: !modals.registration.isOpen,
              })
            }
            className="2xl:text-2 xl m-auto text-xl font-semibold sm:text-base md:text-lg"
          >
            Join us
          </Button>

          <RegistrationModal />
          <LoginModal />
        </CardContent>
      </Card>
    </div>
  )
}

export default MainBanner
