import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import Link from "next/link"
import { ReactElement } from "react"
import { NextPageWithLayout } from "types/global"

const Politicas: NextPageWithLayout = () => {
  return (
    <>
      <Head title="Términos y condiciones" description="Something went wrong" />
      <div className="flex flex-col small:flex-row items-end justify-between small:border-t border-gray-200 px-8 py-14 gap-x-8">
          <div>
            <h3 className="text-xl-semi mb-4">Términos y condiciones</h3>
            <span className="text-small-regular">
              You can find frequently asked questions and answers on our
              customer service page.
            </span>
          </div>

        </div>
    </>
  )
}

Politicas.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default Politicas
