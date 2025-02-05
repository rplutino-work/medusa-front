import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import Link from "next/link"
import { ReactElement } from "react"
import { NextPageWithLayout } from "types/global"

const Nosotros: NextPageWithLayout = () => {
  return (
    <>
      <Head title="Nosotros" description="Something went wrong" />
      <div className="flex flex-col small:flex-col items-end justify-between small:border-t border-gray-200 px-8 py-14 gap-x-8">
        <div className="flex flex-col items-center justify-center w-full">
          <img className="header-logo" src="/logo-header-black.svg" alt="logo TSK" />
        </div>
        <div>
          <h3 className="text-xl-semi mb-4">Nosotros</h3>
          <span className="text-base-regular">
            Nuestra empresa TSK es una empresa familiar, importadora de artículos de pesca y camping, con una amplia variedad de productos para satisfacer las necesidades de los pescadores más exigentes.
            Con más de 20 años en el mercado, nos hemos destacado por ofrecer productos de alta calidad, servicio post venta y brindar una excelente atención a nuestros clientes. Nos orgullece decir que hemos construido relaciones duraderas con nuestros clientes, quienes han confiado en nosotros para proveerles los mejores artículos de pesca y camping.
            En nuestra página podrán encontrar una gran variedad de productos, desde cañas, reels, señuelos, anzuelos entre otros y todo lo necesario para disfrutar de su pasión por la pesca.
            Además, trabajamos marcas mundialmente reconocidas para garantizar la calidad y durabilidad de nuestros productos, los cuales son testeados antes de comercializarlos.
            En TSK nos enfocamos en brindar un servicio personalizado y adaptado a las necesidades especificas de cada cliente. Nuestro equipo altamente capacitado esta listo para asesorarlos y ayudarlos a encontrar el articulo perfecto para sus necesidades.
          </span>
        </div>

      </div>
    </>
  )
}

Nosotros.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default Nosotros
