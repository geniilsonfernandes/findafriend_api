import { prisma } from '../../lib/prisma'

import { OrganizationsRepository } from '../implementations/IOrganizationsRepository'
import { Organizations } from '../../entities/Organizations'
import { IOrganizationCreateDTO } from '../implementations/DTO'

class PrismaOrganizationsRepository implements OrganizationsRepository {
    async create(data: IOrganizationCreateDTO): Promise<Organizations> {
        const organization = await prisma.organizations.create({ data })

        return organization
    }
    async findByEmail(email: string): Promise<Organizations | null> {
        const organization = await prisma.organizations.findFirst({
            where: {
                email
            }
        })

        return organization
    }
}

export { PrismaOrganizationsRepository }
