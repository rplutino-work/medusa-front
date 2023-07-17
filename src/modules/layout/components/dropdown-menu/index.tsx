import { Popover, Transition } from "@headlessui/react";
import {
  useFeaturedProductsQuery,
  useNavigationCollections,
} from "@lib/hooks/use-layout-data";
import clsx from "clsx";
import { chunk } from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useProductCategories } from "medusa-react";
import { ProductCategory } from "@medusajs/medusa";
import Medusa from "@medusajs/medusa-js";

const DropdownMenu = () => {
  const [menu, setMenu] = useState<Array<boolean>>([]);
  const [categorias, setCategorias] = useState<Array<ProductCategory>>([]);
  const { push } = useRouter();
  const { data: collections, isLoading: loadingCollections } =
    useNavigationCollections();
  const { data: products, isLoading: loadingProducts } =
    useFeaturedProductsQuery();

  const { product_categories, isLoading } = useProductCategories();

  useEffect(() => {
    const medusa = new Medusa({ baseUrl: "http://localhost:9000/", maxRetries: 3 });

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
    <>
      <div className="flex gap-x-6 items-center h-full">
        {isLoading && <span>Loading...</span>}
        {product_categories && !product_categories.length && (
          <span>No Categories</span>
        )}
        {product_categories && product_categories.length > 0 && (
          <>
            {product_categories
              .filter((category) => !category.parent_category)
              .map((category: ProductCategory, index) => (
                <div
                  onMouseEnter={() =>
                    setMenu((prevMenu) => [
                      ...prevMenu.slice(0, index),
                      true,
                      ...prevMenu.slice(index + 1),
                    ])
                  }
                  onMouseLeave={() =>
                    setMenu((prevMenu) => [
                      ...prevMenu.slice(0, index),
                      false,
                      ...prevMenu.slice(index + 1),
                    ])
                  }
                  className="h-full"
                  key={category.id}
                >
                  <div className="flex items-center h-full">
                    <Popover className="h-full flex">
                      {({ open }) => (
                        <>
                          {category.category_children.length >= 1 ? (
                            <>
                              <Link href={`/category/${category.id}`} passHref>
                                <a className="navbar-item-link navbar-item-link-children relative flex h-full">
                                  <Popover.Button
                                    className={clsx(
                                      "relative h-full flex items-center transition-all ease-out navbar-item duration-200 ui-open:rotate-180"
                                    )}
                                    onClick={() =>
                                      push(`/category/${category.id}`)
                                    }
                                  >
                                    {category.name}
                                  </Popover.Button>
                                </a>
                              </Link>
                              <Transition
                                show={menu[index]}
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
                                      {categorias
                                        .find((c) => c.id === category.id)
                                        ?.category_children.map(
                                          (childCategory: ProductCategory) => (
                                            <div
                                              className="flex flex-col flex-1 max-w-[30%]"
                                              key={childCategory.id}
                                            >
                                              <Link href={`/category/${childCategory.id}`}>
                                              <h3 className="dropdown-item text-base-semi text-white-900 mb-4">
                                                {childCategory.name}
                                              </h3>
                                              </Link>
                                              <div className="flex items-start">
                                                {childCategory.category_children.length >=
                                                1 ? (
                                                  <ul className="min-w-[152px] max-w-[200px] pr-4">
                                                    {childCategory.category_children.map(
                                                      (grandchildCategory: ProductCategory) => (
                                                        <li
                                                          key={grandchildCategory.id}
                                                        >
                                                          <div className="pb-3">
                                                            <Link href={`/category/${grandchildCategory.id}`}>
                                                              <a
                                                                className="dropdown-item-list"
                                                                onClick={() =>
                                                                  setMenu(
                                                                    (
                                                                      prevMenu
                                                                    ) => [
                                                                      ...prevMenu.slice(
                                                                        0,
                                                                        index
                                                                      ),
                                                                      false,
                                                                      ...prevMenu.slice(
                                                                        index +
                                                                          1
                                                                      ),
                                                                    ]
                                                                  )
                                                                }
                                                              >
                                                                {
                                                                  grandchildCategory.name
                                                                }
                                                              </a>
                                                            </Link>
                                                          </div>
                                                        </li>
                                                      )
                                                    )}
                                                  </ul>
                                                ) : (
                                                  <ul className="min-w-[152px] max-w-[200px] pr-4">
                                                    <li>
                                                      <div className="pb-3">
                                                        <Link href="">
                                                          <a
                                                            className="dropdown-item-list"
                                                            onClick={() =>
                                                              setMenu(
                                                                (
                                                                  prevMenu
                                                                ) => [
                                                                  ...prevMenu.slice(
                                                                    0,
                                                                    index
                                                                  ),
                                                                  false,
                                                                  ...prevMenu.slice(
                                                                    index +
                                                                      1
                                                                  ),
                                                                ]
                                                              )
                                                            }
                                                          >
                                                            
                                                          </a>
                                                        </Link>
                                                      </div>
                                                    </li>
                                                  </ul>
                                                )}
                                              </div>
                                            </div>
                                          )
                                        )}
                                    </div>
                                  </div>
                                </Popover.Panel>
                              </Transition>
                            </>
                          ) : (
                            <Link href={`/category/${category.id}`} passHref>
                              <a className="navbar-item-link relative flex h-full">
                                <Popover.Button
                                  className={clsx(
                                    "relative h-full flex items-center transition-all ease-out navbar-item duration-200 ui-open:rotate-180"
                                  )}
                                  onClick={() =>
                                    push(`/category/${category.id}`)
                                  }
                                >
                                  {category.name}
                                </Popover.Button>
                              </a>
                            </Link>
                          )}
                        </>
                      )}
                    </Popover>
                  </div>
                </div>
              ))}
          </>
        )}
      </div>
    </>
  );
};

export default DropdownMenu;
