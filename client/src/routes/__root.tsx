import { AppFooter } from '@/components/AppFooter'
import { AppHeader } from '@/components/AppHeader'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: () => (
    <div className="flex min-h-screen flex-col">
      <AppHeader />

      <main className="flex-1">
        <div className="container m-auto">
          <Outlet />
        </div>
      </main>

      <AppFooter />

      <TanStackRouterDevtools />
    </div>
  ),
})
