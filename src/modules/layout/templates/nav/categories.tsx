import { useProductCategories } from "medusa-react";
import { ProductCategory } from "@medusajs/medusa";
import Link from "next/link"

function Categories() {
  const { 
    product_categories, 
    isLoading,
  } = useProductCategories();

console.log(product_categories)
  return (
    <></>
    // <div>
    //   {isLoading && <span>Loading...</span>}
    //   {product_categories && !product_categories.length && (
    //     <span>No Categories</span>
    //   )}
    //   {product_categories && product_categories.length > 0 && (
    //     <ul>
    //       {product_categories
    //         .filter((category) => category.parent_category)
    //         .map((category: ProductCategory) => (
    //           <li key={category.id}>
    //             <Link href={`/category/${category.id}`}>{category.name}</Link>
    //           </li>
    //         ))}
    //     </ul>
    //   )}
    // </div>
  );
}

export default Categories;
