import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST (request) {
    try {
        const data = await request.json()
        const genero = await prisma.gender.create(({
            data: data
        }))
        return  new NextResponse(JSON.stringify(genero), {
            headers: {"Content-Type":"application/json"},
            status: 200
        })
    } catch (error) {
        return new NextResponse(error.message, {status:500})
    }
}

export async function GET () {
    try {
        const genders = await prisma.gender.findMany()
        return NextResponse.json({datos: genders}, {status: 200})
    } catch (error) {
        return new NextResponse(error.message, {status: 500})
    }
}