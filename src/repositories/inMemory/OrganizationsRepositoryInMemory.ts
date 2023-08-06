import { OrganizationsRepository } from '../implementations/IOrganizationsRepository'
import { Organizations } from '../../entities/Organizations'
import { randomUUID } from 'crypto'
import { IOrganizationCreateDTO } from '../implementations/DTO'

class OrganizationsRepositoryInMemory implements OrganizationsRepository {
    private organizations: Organizations[] = []

    async create(data: IOrganizationCreateDTO): Promise<Organizations> {
        const organization = {
            id: randomUUID(),
            ...data,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        this.organizations.push(organization)

        return organization
    }

    async findByEmail(email: string): Promise<Organizations | null> {
        return (
            this.organizations.find(
                (organization) => organization.email === email
            ) || null
        )
    }
}

export { OrganizationsRepositoryInMemory }
