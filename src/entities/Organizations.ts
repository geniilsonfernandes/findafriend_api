interface Organizations {
    id: string
    name: string
    email: string
    phone: string
    address: string
    city: string
    state: string
    cep: string
    website: string | null
    password: string
    createdAt: Date
    updatedAt: Date
}

export { Organizations }
