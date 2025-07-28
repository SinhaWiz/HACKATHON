import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
  const { studentName, email, societyId } = await req.json()
  const registration = await prisma.registration.create({
    data: { studentName, email, societyId }
  })
  return NextResponse.json(registration)
}