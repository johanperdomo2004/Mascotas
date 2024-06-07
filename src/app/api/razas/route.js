import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST (request) {
    try {
        const data = await request.json()
        const newRaza = await prisma.race.create(({
            data: data
        }))
        return  new NextResponse(JSON.stringify(newRaza), {
            headers: {"Content-Type":"application/json"},
            status: 200
        })
    } catch (error) {
        return new NextResponse(error.message, {status:500})
    }
}

export async function GET () {
    try {
        const razas = await prisma.race.findMany()
        return NextResponse.json({datos: razas}, {status: 200})
    } catch (error) {
        return new NextResponse(error.message, {status: 500})
    }
}