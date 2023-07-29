import { IPet } from '../../entities/Pet'
import { PrismaPetsRepository } from '../../repositories/prisma/PrismaPetsRepository'

interface ICreatePetUseCaseRequestDTO {
    name: string
    about: string
    age: string
    size: string
    energy_level: string
    independence_level: string
    environment: string
    photos: string[]
    requirements: string[]
}

interface ICreatePetUseCaseResponseDTO extends IPet {}

class CreatePetUseCase {
    constructor(private petsRepository: PrismaPetsRepository) {}

    async execute(request: ICreatePetUseCaseRequestDTO): Promise<ICreatePetUseCaseResponseDTO> {
        const pet = await this.petsRepository.create(request)

        return pet
    }
}

export { CreatePetUseCase }