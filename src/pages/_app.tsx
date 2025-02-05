import { MEDUSA_BACKEND_URL, queryClient } from "@lib/config"
import { AccountProvider } from "@lib/context/account-context"
import { CartDropdownProvider } from "@lib/context/cart-dropdown-context"
import { MobileMenuProvider } from "@lib/context/mobile-menu-context"
import { StoreProvider } from "@lib/context/store-context"
import { Hydrate } from "@tanstack/react-query"
import { CartProvider, MedusaProvider } from "medusa-react"
import "styles/globals.css"
import "styles/styles.scss"
import { AppPropsWithLayout } from "types/global"

function App({
  Component,
  pageProps,
}: AppPropsWithLayout<{ dehydratedState?: unknown }>) {
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <MedusaProvider
      baseUrl={MEDUSA_BACKEND_URL}
      publishableApiKey="pk_fa85b1776e639721974f4ab752c7ffe0a69fbadf3b395caadc8bcde58274a2b3"
      queryClientProviderProps={{
        client: queryClient,
      }}
    >
      <Hydrate state={pageProps.dehydratedState}>
        <CartDropdownProvider>
          <MobileMenuProvider>
            <CartProvider>
              <StoreProvider>
                <AccountProvider>
                  {getLayout(<Component {...pageProps} />)}
                </AccountProvider>
              </StoreProvider>
            </CartProvider>
          </MobileMenuProvider>
        </CartDropdownProvider>
      </Hydrate>
    </MedusaProvider>
  )
}

export default App
