import React from 'react'
import { useRouter } from 'next/navigation'
import btnClose from "../img/btn-close.svg"
import Image from 'next/image'

function Close() {

    const router = useRouter()

    const closeSesion = () => {
        alert("Cerrando sesión")
        localStorage.clear()
        router.push('/')
      }

  return (
    <>
     <Image
      onClick={closeSesion}
        src={btnClose}
        alt='btn-back'
        />
    </>
  )
}

export default Close