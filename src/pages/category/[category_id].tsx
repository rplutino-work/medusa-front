import { useProductCategories, useProducts } from "medusa-react"
import { useRouter } from "next/router"
import CategoryTemplate from "@modules/category/templates"
import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import SkeletonCollectionPage from "@modules/skeletons/templates/skeleton-collection-page"
import { ReactElement } from "react"

const CategoryPage = () => {
  const { query, isFallback, replace } = useRouter()
  const categoryId = typeof query.category_id === "string" ? query.category_id : ""

  // Obtener las categorías usando el hook `useProductCategories`
  const { product_categories, isLoading: categoriesLoading, isError: categoriesError } = useProductCategories()

  // Obtener los productos de la categoría usando `useProducts`
  const { products, isLoading, isError } = useProducts({
    category_id: [categoryId], // Filtra los productos por categoría
    limit: 12,
  })

  // Si la categoría no existe o hay un error, redirigir a 404
  if (categoriesError || isError) {
    replace("/404")
    return <SkeletonCollectionPage />
  }

  // Si está cargando las categorías o productos, mostrar un skeleton
  if (isFallback || categoriesLoading || isLoading) {
    return <SkeletonCollectionPage />
  }

  // Buscar la categoría seleccionada por su ID
  const category = product_categories.find((cat) => cat.id === categoryId)

  // Si no se encuentra la categoría, redirigir a 404
  if (!category) {
    replace("/404")
    return <SkeletonCollectionPage />
  }

  return (
    <>
      <Head title={category.name} description={`${category.name} category`} />
      <CategoryTemplate category={category} products={products} />
    </>
  )
}

CategoryPage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default CategoryPage
