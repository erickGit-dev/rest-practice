interface IUsers {
    name: string,
    email: string,
    password: string,
    address: {
        street: string,
        city: string,
        state: string,
        postalCode: string
    },
    phone: string
}

export default IUsers