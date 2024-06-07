import prisma from "@/lib/prisma"
import { NextResponse } from  "next/server"

export async function POST (request) {
    try {
        const data = await request.json()
    const user = await prisma.user.create(({
        data: data
    }))
    return new NextResponse(JSON.stringify(user), {
        headers: {"Content-Type":"application/json"},
        status: 201
    })
    } catch (error) {
      return new NextResponse(error.message, {status:500})  
    }
}

export async function GET () {
    try {
        const users = await prisma.user.findMany()
        return NextResponse.json({ datos: users}, {status: 200})
    } catch (error) {
        return new NextResponse(error.message, {status:500})  
    }
}