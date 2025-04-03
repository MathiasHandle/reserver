import { useStore } from '@/store'
import { Dialog, DialogContent, DialogPortal, DialogTitle } from '@radix-ui/react-dialog'
import { Card, CardContent, CardHeader } from '../ui/card'
import { DialogClose } from '../ui/dialog'
import LoginForm from './LoginForm'

function LoginModal() {
  const modals = useStore(state => state.modals)
  const setModal = useStore(state => state.setModal)

  function toggleModal() {
    setModal('login', { isOpen: !modals.login.isOpen })
  }

  return (
    <>
      {/* TODO add backdrop variable for all dialogs / drawers */}
      <Dialog open={modals.login.isOpen} onOpenChange={toggleModal}>
        <DialogPortal>
          <DialogTitle className="sr-only">Log in form</DialogTitle>

          <DialogContent>
            <div className="absolute top-0 left-0 z-50 min-h-full w-full sm:top-20 sm:left-1/2 sm:min-h-0 sm:max-w-[500px] sm:-translate-x-1/2">
              <Card className="min-h-dvh rounded-none sm:min-h-0 sm:rounded-xl sm:px-20">
                <CardHeader className="relative text-center text-3xl font-bold">
                  <h2>Log in</h2>

                  {/* TODO replace with icon */}
                  <DialogClose className="absolute top-0 right-0">close</DialogClose>
                </CardHeader>

                <CardContent>
                  <LoginForm />

                  <div className="mt-8 text-center sm:mt-4">
                    Not registered yet?
                    <span
                      className="ml-1 cursor-pointer font-bold hover:underline"
                      onClick={() => setModal('registration', { isOpen: true, resetModals: true })}
                    >
                      Register
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    </>
  )
}

export default LoginModal
