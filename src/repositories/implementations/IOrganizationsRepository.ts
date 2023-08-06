import { Organizations } from '../../entities/Organizations'
import { IOrganizationCreateDTO } from './DTO'

interface OrganizationsRepository {
    create(data: IOrganizationCreateDTO): Promise<Organizations>
    findByEmail(email: string): Promise<Organizations | null>
}

export { OrganizationsRepository }
