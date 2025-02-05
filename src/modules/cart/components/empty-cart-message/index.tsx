import UnderlineLink from "@modules/common/components/underline-link"

const EmptyCartMessage = () => {
  return (
    <div className="bg-amber-100 px-8 py-24 flex flex-col justify-center items-center text-center">
      <h1 className="text-2xl-semi">Tu carrito esta vacío</h1>
      <p className="text-base-regular mt-4 mb-6 max-w-[32rem]">
        Explora productos y agregalos al carrito para poder verlos aquí
      </p>
      <div>
        <UnderlineLink href="/">Ver productos</UnderlineLink>
      </div>
    </div>
  )
}

export default EmptyCartMessage
