import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    return new Response("Method not allowed", { status: 405 });
}

export async function POST(req: NextRequest) {
    //create user
    const body = await req.json();

    const user = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email,
        },
    });

    return new Response(JSON.stringify(user), { status: 201 });
}

export async function PUT(req: NextRequest) {
    return new Response("Method not allowed", { status: 405 });
}

export async function DELETE(req: NextRequest) {
    return new Response("Method not allowed", { status: 405 });
}
