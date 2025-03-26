import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const skip = (page - 1) * limit;

  const data = await prisma.project.findMany({
    take: limit,
    skip: skip,
    orderBy: {
      createdAt: "desc",
    },
  });

  const total = await prisma.project.count();

  return Response.json({
    data,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  });
}

export async function POST(req: NextRequest) {
  return new Response("Method not allowed", { status: 405 });
}

export async function PUT(req: NextRequest) {
  return new Response("Method not allowed", { status: 405 });
}

export async function DELETE(req: NextRequest) {
  return new Response("Method not allowed", { status: 405 });
}
