import { useStore } from '@/store'
import { Dialog, DialogContent, DialogPortal, DialogTitle } from '@radix-ui/react-dialog'
import { Card, CardContent, CardHeader } from '../ui/card'
import { DialogClose } from '../ui/dialog'
import RegistrationForm from './RegistrationForm'

function RegistrationModal() {
  const modals = useStore(state => state.modals)
  const setModal = useStore(state => state.setModal)

  function toggleModal() {
    setModal('registration', { isOpen: !modals.registration.isOpen })
  }

  return (
    <>
      {/* TODO add backdrop variable for all dialogs / drawers */}
      <Dialog open={modals.registration.isOpen} onOpenChange={toggleModal}>
        <DialogPortal>
          <DialogTitle className="sr-only">Registration form</DialogTitle>

          {/* TODO fix on 320px */}
          <DialogContent>
            <div className="absolute top-0 left-0 z-50 min-h-full w-full sm:top-20 sm:left-1/2 sm:min-h-0 sm:max-w-[500px] sm:-translate-x-1/2">
              <Card className="min-h-dvh rounded-none px-20 sm:min-h-0 sm:rounded-xl">
                <CardHeader className="relative text-center text-3xl font-bold">
                  <h2>Registration</h2>

                  {/* TODO replace with icon */}
                  <DialogClose className="absolute top-0 right-0">close</DialogClose>
                </CardHeader>

                <CardContent>
                  <RegistrationForm />
                </CardContent>
              </Card>
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </>
  )
}

export default RegistrationModal
