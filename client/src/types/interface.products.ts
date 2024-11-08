import IUsers from "./interface.user";

interface IProducts {
    _id: string,
    name: string,
    price: number,
    quantity: number,
    description: string,
    image: string;
    createdAt: string;
    updatedAt: string;
    customer_id: IUsers;
}

export default IProducts;