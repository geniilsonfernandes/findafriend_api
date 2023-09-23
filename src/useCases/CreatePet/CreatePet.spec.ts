import { beforeEach, describe, expect, it } from 'vitest'
import { PetRepositoryInMemory } from '../../repositories/inMemory/PetRepositoryInMemory'
import { CreatePetUseCase } from './CreatePetUseCase'

let petRepositoryInMemory: PetRepositoryInMemory
let createPetUseCase: CreatePetUseCase

describe('Create Pet use case', () => {
    beforeEach(() => {
        petRepositoryInMemory = new PetRepositoryInMemory()
        createPetUseCase = new CreatePetUseCase(petRepositoryInMemory)
    })

    it('should create a new pet', async () => {
        const pet = await createPetUseCase.execute({
            name: 'Pet Name',
            about: 'Pet About',
            age: 'Pet Age',
            size: 'Pet Size',
            energy_level: 'Pet Energy Level',
            independence_level: 'Pet Independence Level',
            environment: 'Pet Environment',
            photos: ['Pet Photo'],
            requirements: ['Pet Requirement'],
            organization_id: '123456789'
        })

        expect(pet).toHaveProperty('id')
    })
})
