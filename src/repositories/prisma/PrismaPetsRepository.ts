import { Prisma } from '@prisma/client'
import { prisma } from '../../lib/prisma'

class PrismaPetsRepository {
    async create(data: Prisma.PetsCreateInput) {
        const pet = await prisma.pets.create({
            data
        })

        return pet
    }
}

export { PrismaPetsRepository }
