import prisma from "@/lib/prisma"
import { NextResponse } from  "next/server"
import bcrypt from "bcrypt"

export async function POST (request) {
    try {
        const data = await request.json()

        // encriptar contraseña
        const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create(({
        data: {
            ...data,
            password:  hashedPassword
        }
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
