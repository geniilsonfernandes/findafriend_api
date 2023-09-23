import { prisma } from '../../lib/prisma'
import {
    IPetRepository,
    ICreatePetUseCaseRequestDTO
} from '../implementations/IPetRepository'
import { Pet } from '../../entities/Pets'

class PrismaPetsRepository implements IPetRepository {
    async create(data: ICreatePetUseCaseRequestDTO): Promise<Pet> {
        return prisma.pets.create({
            data: {
                about: data.about,
                age: data.age,
                name: data.name,
                size: data.size,
                energy_level: data.energy_level,
                independence_level: data.independence_level,
                environment: data.environment,
                photos: data.photos,
                organization_id: data.organization_id,
                requirements: data.requirements
            }
        })
    }
}

export { PrismaPetsRepository }
