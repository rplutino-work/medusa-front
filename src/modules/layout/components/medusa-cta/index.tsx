const MedusaCTA = () => {
  return (
    <div className="py-4 flex justify-center items-center w-full">
      <div className="content-container flex justify-center flex-1">
        <a href="http://www.rok.com.ar" target="_blank" rel="noreferrer">
          <PoweredBy />
        </a>
      </div>
    </div>
  )
}

const PoweredBy = () => {
  return (
    <p className="text-xsmall-regular text-gray-500">Desarrollado por ROK DEVELOPMENT</p>
  )
}

export default MedusaCTA
