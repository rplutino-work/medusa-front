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
import { medusaClient } from "@lib/config"

interface Category {
  id: string;
  name: string;
}

interface Params extends ParsedUrlQuery {
  category_id: string;
}

export const fetchCategory = async ({ category_id }: { category_id: string }) => {
  const medusa = new Medusa({ baseUrl: 'http://localhost:9000/', publishableApiKey: 'pk_fa85b1776e639721974f4ab752c7ffe0a69fbadf3b395caadc8bcde58274a2b3', maxRetries: 3 })

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

    console.log('Data from first request:', data);

    const medusaData = await medusaClient.products.list();

    console.log('Data from Medusa request:', medusaData);

    // Convertir data.productIds a una matriz
    const existingProducts = data.productIds || [];

    // Combinar los nuevos productos con los productos existentes
    const mergedProducts = existingProducts.reduce((acc: any, existingProduct: any) => {
      const matchingProduct = medusaData.products.find(
        (newProduct) => newProduct.id === existingProduct.id
      );

      if (matchingProduct) {
        acc.push(matchingProduct);
      }

      return acc;
    }, []);

    console.log('Merged products:', mergedProducts);

    return mergedProducts;
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
    return <SkeletonCollectionPage />
  }

  if (categoryError || productsError) {
    if (IS_BROWSER) {
      // replace("/404")
    }
    return <SkeletonCollectionPage />
  }

  if (!categoryData) {
    return <SkeletonCollectionPage />
  }

  const products = productsData || [];

  if (products.length < 1) {
    console.log("La categoría no tiene productos");
    if (IS_BROWSER) {
      // replace("/404")
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
