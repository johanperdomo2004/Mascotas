import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET (request, {params}) {
    try {
        const id = parseInt(params.id)
        const result = await prisma.category.findFirst({
            where : {id : id}
        })
        if (!result) {
            return new NextResponse("Categoría not found", {status: 404})
        }
        return NextResponse.json(result)
    } catch (error) {
        return new NextResponse(error.message, {status: 500})
    }
}

export async function DELETE (request, {params}) {
    try {
        const id = parseInt(params.id)
        const result = await prisma.category.delete({
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
        const result = await prisma.category.update({
            where : {id : id},
            data : data
        })
        return NextResponse.json({message: result}, {status: 200})
    } catch (error) {
        return new NextResponse(error.message, {status: 500})
    }
}