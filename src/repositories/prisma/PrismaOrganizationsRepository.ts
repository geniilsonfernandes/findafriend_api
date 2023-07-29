import { prisma } from '../../lib/prisma'
import {
    IOrganizationCreateDTO,
    OrganizationsRepository
} from '../implementations/IOrganizationsRepository'
import { Organizations } from '../../entities/Organizations'

class PrismaOrganizationsRepository implements OrganizationsRepository {
    async create(data: IOrganizationCreateDTO): Promise<Organizations> {
        const organization = prisma.organizations.create({ data })

        return organization
    }
}

export { PrismaOrganizationsRepository }
