import { useMobileMenu } from "@lib/context/mobile-menu-context"
import Hamburger from "@modules/common/components/hamburger"
import CartDropdown from "@modules/layout/components/cart-dropdown"
import DropdownMenu from "@modules/layout/components/dropdown-menu"
import MobileMenu from "@modules/mobile-menu/templates"
import DesktopSearchModal from "@modules/search/templates/desktop-search-modal"
import clsx from "clsx"
import Link from "next/link"
import { useRouter } from "next/router"
import { Listbox, Transition } from "@headlessui/react"
import { Fragment, useEffect, useMemo, useState } from "react"

const Nav = () => {
  const { pathname } = useRouter()
  const [isHome, setIsHome] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  //useEffect that detects if window is scrolled > 5px on the Y axis
  useEffect(() => {
    if (isHome) {
      const detectScrollY = () => {
        if (window.scrollY > 5) {
          setIsScrolled(true)
        } else {
          setIsScrolled(false)
        }
      }

      window.addEventListener("scroll", detectScrollY)

      return () => {
        window.removeEventListener("scroll", detectScrollY)
      }
    }
  }, [isHome])

  useEffect(() => {
    pathname === "/" ? setIsHome(true) : setIsHome(false)
  }, [pathname])

  const { toggle } = useMobileMenu()

  return (
    <div
      className={clsx("sticky top-0 inset-x-0 z-50 group navbar-container", {
        "!fixed": isHome,
      })}
    >
      <header
        className={clsx(
          "relative h-16 px-8 mx-auto transition-colors bg-transparent border-b border-transparent duration-200 group-hover:bg-black",
          {
            "!bg-black ": !isHome || isScrolled,
          }
        )}
      >
        <div className="header-languages">
          <Listbox defaultValue="">
            <Listbox.Button className="py-1 w-full">
              <div className="text-small-regular flex items-center gap-x-2 xsmall:justify-end">
                {/* <span>Idioma:</span>
                  <span className="text-small-semi flex items-center gap-x-2">
                      Español
                  </span>
                  <span className="text-small-semi flex items-center gap-x-2">
                      Ingles
                  </span> */}
                
              </div>
            </Listbox.Button>
            <div className="relative w-full min-w-[316px]">
              <Transition
                as={Fragment}
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options
                  className="absolute -bottom-[calc(100%-36px)] left-0 xsmall:left-auto xsmall:right-0 max-h-[442px] overflow-y-scroll z-[900] bg-white drop-shadow-md text-small-regular uppercase text-black no-scrollbar"
                  static
                >
                      {/* <span>dwwdd</span>
                      <span>dwwdd</span> */}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
        <hr />
        <nav
          className={clsx(
            "text-gray-900 text-white flex items-center justify-between header-items-box w-full h-full text-small-regular transition-colors duration-200",
            {
              "text-white": isHome && !isScrolled,
            }
          )}
        >
          <div className="header-items-1 flex-1 basis-0 h-full flex items-center">
            <Link href="/">
              {/* <a className="text-xl-semi uppercase">ruger</a> */}
              <img className="header-logo" src="/logo-header-white.svg" alt="logo TSK" />
            </Link>
          </div>
          
          <div className="header-items-2 flex-1 basis-0 h-full flex items-center justify-center">
            <div className="block small:hidden">
              <Hamburger setOpen={toggle} />
            </div>
            <div className="hidden small:block h-full">
              <DropdownMenu />
            </div>
          </div>

          

          <div className="header-items-3 flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full">
              {process.env.FEATURE_SEARCH_ENABLED && <DesktopSearchModal />}
              <Link href="/account">
                <a className="navbar-item">Mi Cuenta</a>
              </Link>
            </div>
            <CartDropdown />
          </div>
        </nav>
        <MobileMenu />
      </header>
    </div>
  )
}

export default Nav
