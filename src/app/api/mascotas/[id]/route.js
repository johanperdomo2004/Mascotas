import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

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
        const data = await request.json()

        const updatedData = {
            name: data.name,
            photo: data.photo,
            fk_race: { connect: { id: data.race_id } },
            fk_category: { connect: { id: data.category_id } },
            fk_gender: { connect: { id: data.gender_id } }
          };
        const result = await prisma.mascota.update({
            where : {id : id},
            data : updatedData
        })
        return NextResponse.json({message: result}, {status: 200})
    } catch (error) {
        return new NextResponse(error.message, {status: 500})
    }
}