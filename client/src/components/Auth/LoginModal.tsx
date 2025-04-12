import { Dialog, DialogContent, DialogPortal, DialogTitle } from '@/components/ui/dialog'
import { useStore } from '@/store'
import { Card, CardContent, CardHeader } from '../ui/card'
import LoginForm from './LoginForm'

function LoginModal() {
  const modals = useStore(state => state.modals)
  const setModal = useStore(state => state.setModal)

  function switchModals() {
    setModal('registration', { isOpen: true })
    setModal('login', { isOpen: false })
  }

  return (
    <Dialog
      open={modals.login.isOpen}
      onOpenChange={(isOpen: boolean) => setModal('login', { isOpen })}
    >
      <DialogPortal>
        <DialogTitle className="sr-only">Log in form</DialogTitle>

        <DialogContent className="rounded-xl p-0">
          <Card className="min-h-dvh rounded-none sm:min-h-0 sm:rounded-xl sm:px-20">
            <CardHeader className="relative text-center text-3xl font-bold">
              <h2>Log in</h2>
            </CardHeader>

            <CardContent>
              <LoginForm onSuccess={() => setModal('login', { isOpen: false })} />

              <div className="mt-8 text-center sm:mt-4">
                Not registered yet?
                <span
                  className="ml-1 cursor-pointer font-bold hover:underline"
                  onClick={switchModals}
                >
                  Register
                </span>
              </div>
            </CardContent>
          </Card>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

export default LoginModal
