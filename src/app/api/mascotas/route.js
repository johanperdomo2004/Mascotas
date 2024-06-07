import prisma from "@/lib/prisma"; 
import { NextResponse } from "next/server";

export async function POST (request) {
    try {
        const data = await request.json()

        const pet = await prisma.mascota.create(({
          data: data
      }))

        return  new NextResponse(JSON.stringify(pet), {
            headers: {"Content-Type":"application/json"},
            status: 200
        })
    } catch (error) {
        return new NextResponse(error.message, {status:500})
    }
}



export async function GET() {
    try {
      const pets = await prisma.mascota.findMany({
        include: {
          fk_race: true,
          fk_category: true,
          fk_gender: true,
        },
      });
  
      const formattedPets = pets.map(pet => ({
        id: pet.id,
        race: pet.fk_race.name,
        category: pet.fk_category.name,
        photo: pet.photo,
        gender: pet.fk_gender.name,
        name: pet.name,
      }));
  
      return NextResponse.json({ datos: formattedPets }, { status: 200 });
    } catch (error) {
      return new NextResponse(error.message, { status: 500 });
    }
  }