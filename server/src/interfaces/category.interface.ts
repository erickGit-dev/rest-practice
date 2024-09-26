export default interface ICategory extends Document {
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}