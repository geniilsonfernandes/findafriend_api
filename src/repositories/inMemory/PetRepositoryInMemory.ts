import { randomUUID } from 'crypto'
import { Pet } from '../../entities/Pets'
import {
    IPetRepository,
    ICreatePetUseCaseRequestDTO
} from '../implementations/IPetRepository'

class PetRepositoryInMemory implements IPetRepository {
    private pets: Pet[] = []

    async create(data: ICreatePetUseCaseRequestDTO): Promise<Pet> {
        const pet = {
            id: randomUUID(),
            ...data,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        this.pets.push(pet)

        return pet
    }
}

export { PetRepositoryInMemory }
