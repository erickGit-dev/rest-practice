type ObjectId = string;

export interface IProducts {
    _id: ObjectId;
    name: string;
    description: string;
    price: number;
    category: string;
    brand: string;
    stock: number;
    images: string[];
    attributes?: {
        color?: string;
        weight?: string;
        dimensions?: string;
    };
    rating?: number;
    reviews?: IReview[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IReview {
    user: ObjectId; 
    comment: string;
    rating: number;
    date?: Date;
}
