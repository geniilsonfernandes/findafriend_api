import { hash } from 'bcryptjs'
import { Organizations } from '../../entities/Organizations'
import {
    IOrganizationCreateDTO,
    IOrganizationsRepository
} from '../../repositories/implementations/IOrganizationsRepository'
import { AlreadyExistsError } from '../../utils/errors/ErrorHandler'

interface ICreatePetUseCaseResponseDTO extends Organizations {}

class CreateOrganizationUseCase {
    constructor(private repository: IOrganizationsRepository) {}

    async execute(
        data: IOrganizationCreateDTO
    ): Promise<ICreatePetUseCaseResponseDTO> {
        const hashedpassword = await hash(data.password, 8)

        const organizationAlreadyExists = await this.repository.findByEmail(
            data.email
        )

        if (organizationAlreadyExists) {
            throw new AlreadyExistsError('Organization already exists')
        }

        const organization = await this.repository.create({
            ...data,
            password: hashedpassword
        })

        return organization
    }
}

export { CreateOrganizationUseCase }
