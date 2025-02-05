import Head from "@modules/common/components/head"
import Layout from "@modules/layout/templates"
import { ReactElement } from "react"
import { NextPageWithLayout } from "types/global"

const TerminosYCondiciones: NextPageWithLayout = () => {
  return (
    <>
      <Head title="Términos y Condiciones" description="Términos y condiciones de TSK" />
      <div className="flex flex-col small:flex-col items-end justify-between small:border-t border-gray-200 px-8 py-14 gap-x-8">
        <div className="flex flex-col items-center justify-center w-full">
          <img className="header-logo" src="/logo-header-black.svg" alt="logo TSK" />
        </div>
        <div>
          <h3 className="text-xl-semi mb-4">Términos y Condiciones</h3>
          <div className="text-base-regular space-y-4">
            <p>
              Bienvenido a TSK, tu tienda de confianza para artículos de pesca y camping. Al usar nuestro sitio web o comprar con nosotros, aceptas estos términos. Si no estás de acuerdo, por favor no utilices nuestros servicios.
            </p>

            <h4 className="font-bold">1. Productos</h4>
            <p>
              Ofrecemos productos de pesca y camping de marcas reconocidas. Las imágenes y descripciones son orientativas. Si tienes dudas, contáctanos.
            </p>

            <h4 className="font-bold">2. Precios y Pagos</h4>
            <p>
              Los precios incluyen IVA. Aceptamos tarjetas, transferencias y otros métodos de pago. Las promociones tienen condiciones específicas.
            </p>

            <h4 className="font-bold">3. Envíos</h4>
            <p>
              Los plazos de entrega dependen de tu ubicación y el método de envío. Los costos de envío se calculan al finalizar la compra. Revisa tu pedido al recibirlo. Si hay problemas, avísanos en 48 horas.
            </p>

            <h4 className="font-bold">4. Devoluciones</h4>
            <p>
              Aceptamos devoluciones en 10 días si el producto está sin usar y en su embalaje original. En caso de productos defectuosos, te lo reemplazamos o reembolsamos.
            </p>

            <h4 className="font-bold">5. Atención al Cliente</h4>
            <p>
              Estamos para ayudarte. Contáctanos por teléfono, email o nuestro formulario. Horario de atención: [Indica horario].
            </p>

            <h4 className="font-bold">6. Privacidad</h4>
            <p>
              Tus datos están seguros con nosotros. No los compartimos sin tu consentimiento. Usamos métodos de pago seguros.
            </p>

            <h4 className="font-bold">7. Cambios en los Términos</h4>
            <p>
              Podemos actualizar estos términos. Te avisaremos si hay cambios importantes.
            </p>

            <h4 className="font-bold">8. Dudas o Consultas</h4>
            <p>
              Email: <a href="mailto:info@tskpesca.com" className="text-blue-600">info@tskpesca.com</a> <br />
              Teléfono: +54 11 1234-5678 <br />
              Dirección: [Dirección de la empresa]
            </p>

            <p>
              Gracias por elegir TSK. ¡Disfruta de tu pasión por la pesca y el camping con nosotros!
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

TerminosYCondiciones.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}

export default TerminosYCondiciones