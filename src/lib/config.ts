import Medusa from "@medusajs/medusa-js"
import { QueryClient } from "@tanstack/react-query"

// Defaults to standard port for Medusa server
let MEDUSA_BACKEND_URL = "http://localhost:9000"

if (process.env.MEDUSA_BACKEND_URL) {
  MEDUSA_BACKEND_URL = process.env.MEDUSA_BACKEND_URL
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60 * 24,
      retry: 1,
    },
  },
})

const medusaClient = new Medusa({ baseUrl: MEDUSA_BACKEND_URL, publishableApiKey: "pk_fa85b1776e639721974f4ab752c7ffe0a69fbadf3b395caadc8bcde58274a2b3", maxRetries: 3 })


export { MEDUSA_BACKEND_URL, queryClient, medusaClient }
