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
