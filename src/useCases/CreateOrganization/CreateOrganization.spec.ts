import { describe, it, beforeEach, expect } from 'vitest'
import { CreateOrganizationUseCase } from './CreateOrganizationUseCase'
import { OrganizationsRepositoryInMemory } from '../../repositories/inMemory/OrganizationsRepositoryInMemory'
import { UserAlreadyExistsError } from '../../utils/errors/ErrorHandler'
import { compare } from 'bcryptjs'
import { IOrganizationCreateDTO } from '../../repositories/implementations/DTO'

let organizationsRepositoryInMemory: OrganizationsRepositoryInMemory
let createOrganizationUseCase: CreateOrganizationUseCase

const organization: IOrganizationCreateDTO = {
    name: 'Organization Name',
    email: 'foo@sdaad.com',
    phone: '123456789',
    address: 'Organization Address',
    city: 'Organization City',
    state: 'Organization State',
    cep: 'Organization CEP',
    website: 'Organization Website',
    password: '123456'
}

describe('Create Organization use case', () => {
    beforeEach(() => {
        organizationsRepositoryInMemory = new OrganizationsRepositoryInMemory()
        createOrganizationUseCase = new CreateOrganizationUseCase(
            organizationsRepositoryInMemory
        )
    })

    it('should create a new organization', async () => {
        const organizationCreated = await createOrganizationUseCase.execute(
            organization
        )

        expect(organizationCreated).toHaveProperty('id')
        expect(organizationCreated.name).toBe(organization.name)
    })

    it("should hash organization's password", async () => {
        const organizationCreated = await createOrganizationUseCase.execute(
            organization
        )

        const isPasswordCompare = await compare(
            '123456',
            organizationCreated.password
        )

        expect(isPasswordCompare).toBe(true)
    })

    it('should not create a new organization with same email', async () => {
        await createOrganizationUseCase.execute(organization)

        await expect(
            createOrganizationUseCase.execute(organization)
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
})
