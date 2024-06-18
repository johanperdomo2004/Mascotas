import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST (request) {
    try {
        const data = await request.formData()
        console.log(data);
        
        const name = data.get('name');
        const race_id = parseInt(data.get('race_id'), 10);
        const category_id = parseInt(data.get('category_id'), 10);
        const gender_id = parseInt(data.get('gender_id'), 10);
        
        const file = data.get('photo');

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const filePath = path.join(process.cwd(), 'public/img', file.name)
        await writeFile(filePath, buffer)

        const pet = await prisma.mascota.create(({
          data: {
            name: name,
            photo: file.name,
            race_id: race_id,
            category_id: category_id,
            gender_id: gender_id,
          }
      }))

        return  new NextResponse(JSON.stringify(pet), {
            headers: {"Content-Type":"application/json"},
            status: 200
        })
    } catch (error) {
      console.log(error);
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