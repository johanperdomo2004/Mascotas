"use client";

import Link from 'next/link'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import btnBack from "../../img/btn-back.svg"
import btnClose from "../../img/btn-close.svg"
import Image from 'next/image';

function page() {

 const [mascota, setMascota] = useState([])
 const {id} = useParams();

 const getMascota = async () => {
    try {
        const respuesta = await axios.get(`http://localhost:3000/api/mascotas/${id}`)
    setMascota(respuesta.data)
    } catch (error) {
        console.log(error.reponse.data);
    }
 }

 useEffect(() => {
    getMascota()
 }, [])

  return (
   <div className='flex justify-center items-center'>
     <div className='bg-back-image bg-auto bg-center md:w-1/4 w-full h-screen flex  flex-col p-3 gap-3'>
    <div className='flex h-12 w-full justify-center items-center gap-4' >
    <Link href="/pets">
        <Image
        src={btnBack}
        alt='btn-back'
        />
        </Link>
    <h1 className='text-white text-center w-full'>Consultar mascota</h1>
     <Link href="/">
          <Image
          src={btnClose}
          alt='btn cerrar'
          />
         </Link>

    </div>
    <div className='h-64 flex justify-center items-center'>
        <div className='bg-gray-300 rounded-full border-2 border-gray-500 w-40 h-40 text-center'>{mascota.photo}</div>
        </div>
            <div className="flex flex-col items-center gap-3">
            <div className=' flex w-full'>
                <div className=' bg-[#ffffff56]  flex items-center justify-center p-2 w-[200px]'><h1 className='font-bold text-white'>Nombre:</h1></div>
                <input  className='p-3 bg-[#ffffff82] placeholder:text-[#363360] w-full rounded-r-lg' type="text" value={mascota.name} />
            </div>
            <div className=' flex w-full'>
                <div className='  bg-[#ffffff56]  flex items-center justify-center p-2 w-[200px]'><h1 className='font-bold text-white'>Raza:</h1></div>
                <input className='p-3 w-full bg-[#ffffff82] placeholder:text-[#333a60] rounded-r-lg' type="text"  value={mascota.fk_race?.name}  />
            </div>
            <div className=' flex w-full'>
                <div className='  bg-[#ffffff56]  flex items-center justify-center p-2 w-[200px]'><h1 className='font-bold text-white'>Categoría:</h1></div>
                <input className='p-3 w-full bg-[#ffffff82] placeholder:text-[#333a60] rounded-r-lg' type="text" value={mascota.fk_category?.name} />
            </div>
            <div className=' flex w-full'>
                <div className='  bg-[#ffffff56]  flex items-center justify-center p-2 w-[200px]'><h1 className='font-bold text-white'>Género:</h1></div>
                <input className='p-3 w-full bg-[#ffffff82] placeholder:text-[#333a60] rounded-r-lg' type="text" value={mascota.fk_gender?.name} />
            </div>  
    </div>
 </div>
   </div>
  )
}

export default page