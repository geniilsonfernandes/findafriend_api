import { prisma } from '../../lib/prisma'
import { Organizations } from '../../entities/Organizations'
import {
    IOrganizationCreateDTO,
    IOrganizationsRepository
} from '../implementations/IOrganizationsRepository'

class PrismaOrganizationsRepository implements IOrganizationsRepository {
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
