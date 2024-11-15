 type ObjectId = string;
 
interface IUsers {
    _id: ObjectId,
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