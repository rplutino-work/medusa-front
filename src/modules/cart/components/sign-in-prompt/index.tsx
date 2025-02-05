import Button from "@modules/common/components/button"
import Link from "next/link"

const SignInPrompt = () => {
  return (
    <div className="bg-white flex items-start justify-between">
      <div>
        <h2 className="text-xl-semi">Todavia no tenes una cuenta?</h2>
        <p className="text-base-regular text-gray-700 mt-2">
          Registrate para una mejor experiencia
        </p>
      </div>
      <div>
        <Link href="/account/login">
          <a>
            <Button variant="secondary">Registrarme</Button>
          </a>
        </Link>
      </div>
    </div>
  )
}

export default SignInPrompt
