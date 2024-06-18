import prisma from "@/lib/prisma"
import { writeFile } from "fs/promises"
import { NextResponse } from "next/server"
import path from "path"

export async function GET (request, {params}) {
    try {
        const id = parseInt(params.id)
        const result = await prisma.mascota.findFirst({
            where : {id : id},
            include : {
                fk_race: true,
                fk_category: true,
                fk_gender: true,
            }
        })
        if (!result) {
            return new NextResponse("mascota not found", {status: 404})
        }
        return NextResponse.json(result)
    } catch (error) {
        return new NextResponse(error.message, {status: 500})
    }
}

export async function DELETE (request, {params}) {
    try {
        const id = parseInt(params.id)
        const result = await prisma.mascota.delete({
            where : {id : id}
        })
        return NextResponse.json({message: result}, {status: 200})
    } catch (error) {
        return new NextResponse(error.message, {status: 500})
    }
}

export async function PUT (request, {params}) {
    try {
        const id = parseInt(params.id)
        const data = await request.formData()

        const name = data.get('name');
        const race_id = parseInt(data.get('race_id'), 10);
        const category_id = parseInt(data.get('category_id'), 10);
        const gender_id = parseInt(data.get('gender_id'), 10);
        
        const file = data.get('photo');

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const filePath = path.join(process.cwd(), 'public/img', file.name)
        await writeFile(filePath, buffer)

        const updatedData = {
            name: data.name,
            photo: data.photo,
            fk_race: { connect: { id: data.race_id } },
            fk_category: { connect: { id: data.category_id } },
            fk_gender: { connect: { id: data.gender_id } }
          };

        const result = await prisma.mascota.update({
            where : {id : id},
            data: {
            name: name,
            photo: file.name,
            race_id: race_id,
            category_id: category_id,
            gender_id: gender_id,
          }
        })
        return NextResponse.json({message: result}, {status: 200})
    } catch (error) {
        return new NextResponse(error.message, {status: 500})
    }
}