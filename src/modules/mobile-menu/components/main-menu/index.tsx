import { Disclosure, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { useMobileMenu } from "@lib/context/mobile-menu-context"
import { useStore } from "@lib/context/store-context"
import useCountryOptions from "@lib/hooks/use-country-options"
import { useCollections, useMeCustomer } from "medusa-react"
import Link from "next/link"
import ReactCountryFlag from "react-country-flag"
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { ProductCategory } from "@medusajs/medusa";
import Medusa from "@medusajs/medusa-js";
import ChevronDown from "@modules/common/icons/chevron-down"
import Search from "@modules/common/icons/search"
import X from "@modules/common/icons/x"
import { useProductCategories } from "medusa-react";

const MainMenu = () => {
  const { collections } = useCollections()
  const { customer } = useMeCustomer()
  const { countryCode } = useStore()

  const countries = useCountryOptions()

  const {
    close,
    screen: [_, setScreen],
  } = useMobileMenu()

  const setScreenCountry = () => setScreen("country")
  const setScreenSearch = () => setScreen("search")

  const [categorias, setCategorias] = useState<Array<ProductCategory>>([]);
  const { push } = useRouter();

  const { product_categories, isLoading } = useProductCategories();

  useEffect(() => {
    const medusa = new Medusa({ baseUrl: "http://localhost:9000/", publishableApiKey: "pk_fa85b1776e639721974f4ab752c7ffe0a69fbadf3b395caadc8bcde58274a2b3", maxRetries: 3 })

    const fetchData = async () => {
      if (!product_categories) {
        return;
      }

      const updatedCategories: Array<ProductCategory> = [];

      for (const category of product_categories) {
        const updatedCategory: ProductCategory = {
          ...category,
          category_children: [],
        };

        for (const childCategory of category.category_children) {
          const { product_category } = await medusa.productCategories.retrieve(
            childCategory.id
          );

          updatedCategory.category_children.push(product_category);
        }

        updatedCategories.push(updatedCategory);
      }

      setCategorias(updatedCategories);
    };

    fetchData();
  }, [product_categories]);

  return (
    <div className="flex flex-col flex-1">
      <div className="flex items-center justify-between w-full border-b border-gray-200 py-4 px-6">
        <div className="flex-1 basis-0">
          <button
            className="flex items-center gap-x-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={setScreenCountry}
          >
            <ReactCountryFlag countryCode={countryCode || "us"} svg />
            <ChevronDown className="h-5 w-5" />
          </button>
        </div>
        <div>
          <img className="header-logo" src="/logo-header-black.svg" alt="logo TSK" />
        </div>
        <div className="flex-1 basis-0 flex justify-end">
          <button onClick={close}>
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="space-y-6 flex-1 flex flex-col justify-between p-6">
        {process.env.FEATURE_SEARCH_ENABLED && (
          <button
            className="bg-gray-50 flex items-center px-4 py-2 gap-x-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={setScreenSearch}
          >
            <Search size={24} />
            <span placeholder="Search products" className="text-base-regular">
              Buscar productos
            </span>
          </button>
        )}

        <div className="flex flex-col flex-1 text-large-regular text-gray-900">
          <ul className="flex flex-col gap-y-2">
            {isLoading && <span>Loading...</span>}
            {product_categories && !product_categories.length && (
              <span>No Categories</span>
            )}
            {product_categories && product_categories.length > 0 && (
              <>
                {product_categories
                  .filter((category) => !category.parent_category)
                  .map((category: ProductCategory, index) => {
                    const hasChildren = category.category_children.length > 0;

                    return (
                      <Disclosure key={category.id}>
                        {({ open }) => (
                          <>
                            <Disclosure.Button className="flex items-center justify-between w-full bg-gray-200 py-3 px-4 rounded-lg focus:outline-none">
                              <span className="font-medium">{category.name}</span>
                              {hasChildren && (
                                <ChevronDownIcon
                                  className={`${
                                    open ? '-rotate-180' : 'rotate-0'
                                  } w-5 h-5`}
                                />
                              )}
                            </Disclosure.Button>
                            {hasChildren && (
                              <Transition
                                show={open}
                                enter="transition duration-200 ease-out"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="transition duration-200 ease-out"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                              >
                                <Disclosure.Panel
                                  className="w-full justify-between w-full bg-gray-200 px-2 rounded-lg"
                                  static
                                >
                                  {category.category_children.map((childCategory) => (
                                    <div className="w-full justify-between w-full bg-gray-200 py-3 px-4 rounded-lg" key={childCategory.id}>
                                      <Link
                                        href={`/collections/${childCategory.id}`}
                                        passHref
                                      >
                                        <a onClick={close} className="text-gray-700 w-full p-4 mt-2 hover:text-gray-900 focus:outline-none ">
                                          <span>{childCategory.name}</span>
                                        </a>
                                      </Link>
                                    </div>
                                  ))}
                                </Disclosure.Panel>
                              </Transition>
                            )}
                          </>
                        )}
                      </Disclosure>
                    );
                  })}
              </>
            )}
          </ul>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-col gap-y-8 text-small-regular">
            {/* Content goes here */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainMenu
