import prisma from "@/lib/prisma"
import { NextResponse } from  "next/server"
import jwt from "jsonwebtoken"

export async function POST (request) {
    try {
        const user = await request.json();

        const result = await prisma.user.findFirst({
            where: {
                email: user.email,
                password:  user.password
            }
        })

        if (!result) {
            return NextResponse.json(
                {
                    message: "Usuario no encontrado"
                },
                {
                    status: 404
                }
            )
        } else {

            const token = jwt.sign({usuario: result}, "secreto", {expiresIn: '1h'})

            console.log("token:", token)

            const respuesta = {
                user: user,
                token: token
            }

            return new NextResponse(JSON.stringify(respuesta), {
                headers: {"Content-Type":"application/json"},
                status: 201
            })
        }
       
    } catch (error) {
        return new NextResponse(error.message, {status: 500})
    }
}