import { Dialog, DialogContent, DialogPortal, DialogTitle } from '@/components/ui/dialog'
import { useStore } from '@/store'
import { Card, CardContent, CardHeader } from '../ui/card'
import RegistrationForm from './RegistrationForm'

function RegistrationModal() {
  const modals = useStore(state => state.modals)
  const setModal = useStore(state => state.setModal)

  function switchModals() {
    setModal('login', { isOpen: true })
    setModal('registration', { isOpen: false })
  }

  return (
    <Dialog
      modal
      open={modals.registration.isOpen}
      onOpenChange={(isOpen: boolean) => setModal('registration', { isOpen })}
    >
      <DialogPortal>
        <DialogTitle className="sr-only">Registration form</DialogTitle>

        <DialogContent className="rounded-xl p-0">
          <Card className="min-h-dvh rounded-none sm:min-h-0 sm:rounded-xl sm:px-20">
            <CardHeader className="relative text-center text-3xl font-bold">
              <h2>Registration</h2>
            </CardHeader>

            <CardContent>
              <RegistrationForm onSuccess={() => setModal('registration', { isOpen: false })} />

              <div className="mt-8 text-center sm:mt-4">
                Already have an account?
                <span
                  className="ml-1 cursor-pointer font-bold hover:underline"
                  onClick={switchModals}
                >
                  Log in
                </span>
              </div>
            </CardContent>
          </Card>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

export default RegistrationModal
