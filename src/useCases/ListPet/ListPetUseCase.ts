import { Pet } from '../../entities/Pets'
import { PrismaPetsRepository } from '../../repositories/prisma/PrismaPetsRepository'

class ListPetUseCase {
    constructor(private petsRepository: PrismaPetsRepository) {}

    async execute(): Promise<Pet> {
        const pet = ''

        return pet
    }
}

export { ListPetUseCase }
