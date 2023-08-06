import { hash } from 'bcryptjs'
import { Organizations } from '../../entities/Organizations'
import { OrganizationsRepository } from '../../repositories/implementations/IOrganizationsRepository'
import { UserAlreadyExistsError } from '../../utils/errors/ErrorHandler'
import { IOrganizationCreateDTO } from '../../repositories/implementations/DTO'

interface ICreatePetUseCaseResponseDTO extends Organizations {}

class CreateOrganizationUseCase {
    constructor(private OrganizationRepository: OrganizationsRepository) {}

    async execute(
        data: IOrganizationCreateDTO
    ): Promise<ICreatePetUseCaseResponseDTO> {
        const hashedpassword = await hash(data.password, 8)

        const organizationAlreadyExists =
            await this.OrganizationRepository.findByEmail(data.email)

        if (organizationAlreadyExists) {
            throw new UserAlreadyExistsError()
        }

        const organization = await this.OrganizationRepository.create({
            ...data,
            password: hashedpassword
        })

        return organization
    }
}

export { CreateOrganizationUseCase }
