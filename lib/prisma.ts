import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export default prisma;


export async function saveFile(
    name: string, size: string, type: string, id: string) {
    return await prisma.file.create({
        data: {name, size, type, id}
    })
}

export async function getFile(id: string) {
    return await prisma.file.findUnique({
        where: {
            id
        }
    })
}