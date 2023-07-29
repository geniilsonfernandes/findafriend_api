import { Organizations } from '../../entities/Organizations'

export interface IOrganizationCreateDTO {
    name: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    cep: string
    website: string | null
    password: string
}

interface OrganizationsRepository {
    create(data: IOrganizationCreateDTO): Promise<Organizations>
    findByEmail(email: string): Promise<Organizations | undefined>
}

export { OrganizationsRepository }
