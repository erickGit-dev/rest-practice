import IUser from "./interface.user";

interface IProducts {
    _id: string,
    name: string,
    price: number,
    quantity: number,
    description: string,
    image: string;
    createdAt: Date;
    updatedAt: Date;
    customer_id: IUser["_id"];
}

export default IProducts;