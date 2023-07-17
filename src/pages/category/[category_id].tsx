import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { ReactElement } from "react";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import Medusa from "@medusajs/medusa-js";
import SkeletonCollectionPage from "@modules/skeletons/templates/skeleton-collection-page"
import { IS_BROWSER } from "@lib/constants"
import CategoryTemplate from "@modules/category/templates"
import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"

interface Category {
  id: string;
  name: string;
}

interface Params extends ParsedUrlQuery {
  category_id: string;
}

export const fetchCategory = async ({ category_id }: { category_id: string }) => {
  const medusa = new Medusa({ baseUrl: "http://localhost:9000/", maxRetries: 3 });

  try {
    const { product_category } = await medusa.productCategories.retrieve(category_id);

    return product_category as Category;
  } catch (error) {
    console.error("Error al obtener la categoría:", error);
    throw error;
  }
};

export const fetchProducts = async (url: string) => {
  try {
    const response = await fetch(url);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error;
  }
};

const CategoryPage = (): ReactElement => {
  const { query, isFallback, replace } = useRouter()
  const { category_id } = query;
  const url = `http://localhost:9000/store/category-products/${category_id}`;

  const { data: categoryData, isLoading: categoryLoading, isError: categoryError } = useQuery<Category | null>(
    ["category", category_id],
    () => fetchCategory({ category_id: category_id as string }),
    {
      enabled: !!category_id, // Solo realizar la consulta cuando category_id está presente
    }
  );

  const { data: productsData, isLoading: productsLoading, isError: productsError } = useQuery<any>(
    ["categoryProducts", category_id],
    () => fetchProducts(url),
    {
      enabled: !!category_id, // Solo realizar la consulta cuando category_id está presente
    }
  );

  if (categoryLoading || productsLoading) {
    // if (IS_BROWSER) {
    //   replace("/404")
    // }

    return <SkeletonCollectionPage />
  }

  if (categoryError || productsError) {
        if (IS_BROWSER) {
      replace("/404")
    }
    return <SkeletonCollectionPage />
  }

  if (!categoryData) {
    return <SkeletonCollectionPage />
  }

  const products = productsData.productIds || [];

  if (products.length < 1) {
    console.log("La categoria no tiene productos")
    if (IS_BROWSER) {
      replace("/404")
    }
    return <SkeletonCollectionPage />
  }

  return (
    <>
        <Head title={categoryData.name} description={`${categoryData.name} collection`} />
        <CategoryTemplate category={categoryData} products={products} />
      </>
  );
};

CategoryPage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default CategoryPage;
