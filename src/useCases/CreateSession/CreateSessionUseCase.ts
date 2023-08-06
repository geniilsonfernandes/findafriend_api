import { compare } from 'bcryptjs'
import { OrganizationsRepository } from '../../repositories/implementations/IOrganizationsRepository'
import {
    InvalidCredentialsError,
    UserAlreadyExistsError
} from '../../utils/errors/ErrorHandler'
import { Organizations } from '../../entities/Organizations'

interface ICreateSessionUseCaseRequest {
    email: string
    password: string
}

interface ICreateSessionUseCaseResponse {
    organization: Organizations
}

class CreateSessionUseCase {
    constructor(private OrganizationRepository: OrganizationsRepository) {}
    async execute(
        data: ICreateSessionUseCaseRequest
    ): Promise<ICreateSessionUseCaseResponse> {
        const organization = await this.OrganizationRepository.findByEmail(
            data.email
        )

        if (!organization) {
            throw new UserAlreadyExistsError("organization doesn't exists")
        }

        const comparePassword = await compare(
            data.password,
            organization.password
        )

        if (!comparePassword) {
            throw new InvalidCredentialsError('invalid password')
        }

        return {
            organization: organization
        }

        // TODO
    }
}

export { CreateSessionUseCase }
