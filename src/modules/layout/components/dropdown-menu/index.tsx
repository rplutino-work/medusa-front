import { Popover, Transition } from "@headlessui/react"
import {
  useFeaturedProductsQuery,
  useNavigationCollections,
} from "@lib/hooks/use-layout-data"
import repeat from "@lib/util/repeat"
import ProductPreview from "@modules/products/components/product-preview"
import SkeletonProductPreview from "@modules/skeletons/components/skeleton-product-preview"
import clsx from "clsx"
import { chunk } from "lodash"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useState } from "react"

const DropdownMenu = () => {
  const [menu1, setMenu1] = useState(false)
  const [menu2, setMenu2] = useState(false)
  const { push } = useRouter()
  const { data: collections, isLoading: loadingCollections } =
    useNavigationCollections()
  const { data: products, isLoading: loadingProducts } =
    useFeaturedProductsQuery()

  return (

    <div className="flex gap-x-6 items-center h-full">
    <div
      onMouseEnter={() => setMenu1(true)}
      onMouseLeave={() => setMenu1(false)}
      className="h-full"
    >
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          {({ open }) => (
          <>
            <Link href="/shop" passHref>
              <a className="navbar-item-link relative flex h-full">
                <Popover.Button
                  className={clsx(
                    "relative h-full flex items-center transition-all ease-out navbar-item duration-200 ui-open:rotate-180",
                  )}
                  onClick={() => push("/collections/pcol_01GV1EVWV6S4M0H5H0DH109TMA")}
                >
                  Señuelos
                </Popover.Button>
              </a>
            </Link>

            <Transition
              show={menu1}
              as={React.Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Popover.Panel
                static
                className="absolute top-full inset-x-0 text-sm text-white-700 z-30 dropdown-menu-container"
              >
               <div className="relative bg-black py-8">
                  <div className="flex items-start content-container">
                    <div className="flex flex-col flex-1 max-w-[30%]">
                      <h3 className="dropdown-item text-base-semi text-white-900 mb-4">
                        Colecciones
                      </h3>
                      <div className="flex items-start">
                      <ul className="min-w-[152px] max-w-[200px] pr-4">
                            <li>
                                <div className="pb-3">
                                  <Link href="">
                                    <a className="dropdown-item-list" onClick={() => setMenu1(false)}>Menu2</a>
                                  </Link>
                                </div>
                            </li>
                            <li>
                                <div className="pb-3">
                                  <Link href="">
                                    <a className="dropdown-item-list" onClick={() => setMenu1(false)}>Menu2</a>
                                  </Link>
                                </div>
                            </li>
                            <li>
                                <div className="pb-3">
                                  <Link href="">
                                    <a className="dropdown-item-list" onClick={() => setMenu1(false)}>Menu2</a>
                                  </Link>
                                </div>
                            </li>
                          </ul>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="grid grid-cols-3 gap-4">
                        {products?.slice(0, 3).map((product) => (
                          <ProductPreview {...product} key={product.id} />
                        ))}
                        {loadingProducts &&
                          repeat(3).map((index) => (
                            <SkeletonProductPreview key={index} />
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
          )}
        </Popover>
      </div>
    </div>
    <div
      onMouseEnter={() => setMenu2(true)}
      onMouseLeave={() => setMenu2(false)}
      className="h-full"
    >
      <div className="flex items-center h-full">
        <Popover className="h-full flex">
          <>
            <Link href="/shop" passHref>
              <a className="navbar-item-link relative flex h-full">
                <Popover.Button
                  className={clsx(
                    "navbar-item relative h-full flex items-center transition-all ease-out duration-200"
                  )}
                  onClick={() => push("/collections/pcol_01GV189ED57EQJ4FTRAH3X9K71")}
                >
                  Anzuelos
                </Popover.Button>
              </a>
            </Link>

            <Transition
              show={menu2}
              as={React.Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Popover.Panel
                static
                className="absolute top-full inset-x-0 text-sm text-white-700 z-30"
              >
                <div className="relative bg-black py-8">
                  <div className="flex items-start content-container">
                    <div className="flex flex-col flex-1 max-w-[30%]">
                      <h3 className="dropdown-item text-base-semi text-white-900 mb-4">
                        Marcas
                      </h3>
                      <div className="flex items-start">
                          <ul className="min-w-[152px] max-w-[200px] pr-4">
                                <div className="pb-3">
                                  <Link
                                    href=""
                                  >
                                    <a onClick={() => setMenu2(false)}>
                                      Menu2
                                    </a>
                                  </Link>
                                </div>
                          </ul>
                      </div>
                    </div>
                    <div className="flex flex-col flex-1 max-w-[30%]">
                      <h3 className="dropdown-item text-base-semi text-white-900 mb-4">
                        Tipo 1
                      </h3>
                      <div className="flex items-start">
                          <ul className="min-w-[152px] max-w-[200px] pr-4">
                            <li>
                                <div className="pb-3">
                                  <Link href="">
                                    <a className="dropdown-item-list" onClick={() => setMenu2(false)}>Menu2</a>
                                  </Link>
                                </div>
                            </li>
                            <li>
                                <div className="pb-3">
                                  <Link href="">
                                    <a className="dropdown-item-list" onClick={() => setMenu2(false)}>Menu2</a>
                                  </Link>
                                </div>
                            </li>
                            <li>
                                <div className="pb-3">
                                  <Link href="">
                                    <a className="dropdown-item-list" onClick={() => setMenu2(false)}>Menu2</a>
                                  </Link>
                                </div>
                            </li>
                          </ul>
                      </div>
                    </div>
                    <div className="flex flex-col flex-1 max-w-[30%]">
                      <h3 className="dropdown-item text-base-semi text-white-900 mb-4">
                        Tipo 2
                      </h3>
                      <div className="flex items-start">
                          <ul className="min-w-[152px] max-w-[200px] pr-4">
                            <li>
                                <div className="pb-3">
                                  <Link href="">
                                    <a className="dropdown-item-list" onClick={() => setMenu2(false)}>Menu2</a>
                                  </Link>
                                </div>
                            </li>
                            <li>
                                <div className="pb-3">
                                  <Link href="">
                                    <a className="dropdown-item-list" onClick={() => setMenu2(false)}>Menu2</a>
                                  </Link>
                                </div>
                            </li>
                            <li>
                                <div className="pb-3">
                                  <Link href="">
                                    <a className="dropdown-item-list" onClick={() => setMenu2(false)}>Menu2</a>
                                  </Link>
                                </div>
                            </li>
                          </ul>
                      </div>
                    </div>
                    <div className="flex flex-col flex-1 max-w-[30%]">
                      <h3 className="dropdown-item text-base-semi text-white-900 mb-4">
                        Tipo 3
                      </h3>
                      <div className="flex items-start">
                          <ul className="min-w-[152px] max-w-[200px] pr-4">
                            <li>
                                <div className="pb-3">
                                  <Link href="">
                                    <a className="dropdown-item-list" onClick={() => setMenu2(false)}>Menu2</a>
                                  </Link>
                                </div>
                            </li>
                            <li>
                                <div className="pb-3">
                                  <Link href="">
                                    <a className="dropdown-item-list" onClick={() => setMenu2(false)}>Menu2</a>
                                  </Link>
                                </div>
                            </li>
                            <li>
                                <div className="pb-3">
                                  <Link href="">
                                    <a className="dropdown-item-list" onClick={() => setMenu2(false)}>Menu2</a>
                                  </Link>
                                </div>
                            </li>
                          </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        </Popover>
      </div>
    </div>
    </div>
  )
}

export default DropdownMenu
