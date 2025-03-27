import { AppHeader } from '@/components/AppHeader'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <AppHeader />

      <div className="container m-auto">
        <Outlet />
      </div>

      <TanStackRouterDevtools />
    </>
  ),
})
