import { prisma } from "@/lib/prisma";

export interface User {
    name?: string;
    email?: string;
}

export const createUser = async (data: User) => {
    const user = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
        },
    });
    return user;
};

export const getUser = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id,
        },
    });
    return user;
};

export const getUserByEmail = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });
    return user;
};

export const updateUser = async (id: string, data: User) => {
    const user = await prisma.user.update({
        where: {
            id,
        },
        data: {
            name: data.name,
            email: data.email,
        },
    });
    return user;
};

export const deleteUser = async (id: string) => {
    const user = await prisma.user.delete({
        where: {
            id,
        },
    });
    return user;
};
