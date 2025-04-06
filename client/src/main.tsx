import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { QueryClientProvider } from '@tanstack/react-query'

// Import the generated route tree
import { routeTree } from './routeTree.gen'
import { queryClient } from './services/reactQuery'

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />

        <ReactQueryDevtools />
      </QueryClientProvider>
    </StrictMode>
  )
}
