import { Pet } from '../../entities/Pets'

export interface ICreatePetUseCaseRequestDTO {
    name: string
    about: string
    age: string
    size: string
    energy_level: string
    independence_level: string
    environment: string
    photos: string[]
    requirements: string[]
    organization_id: string
}

interface IPetRepository {
    create(data: ICreatePetUseCaseRequestDTO): Promise<Pet>
}

export { IPetRepository }
