import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST (request: Request): Promise<NextResponse> {
    const body = await request.json()
  
    const { clientId, data, resources } = body;

    console.log( clientId )
    console.log( data )
    console.log( resources )

    try {

        const result = await prisma.sustainr.create({
            data: {
                client_id: clientId,
                data: JSON.stringify(data),
                resources: JSON.stringify(resources)
              },
        })
        
        console.log( result )
        return NextResponse.json(result)
    } 
    catch (error) {
        console.error(error);
        return NextResponse.json(error)
    }
}

export async function GET (request: Request): Promise<NextResponse> {
    
  
    try {
        const result = await prisma.sustainr.findMany()
        
        console.log( result )
        return NextResponse.json(result)
    } 
    catch (error) {
        console.error(error);
        return NextResponse.json(error)
    }
}
