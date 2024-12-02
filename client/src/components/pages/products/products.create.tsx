import React, { useState } from "react";
import { IProducts } from "../../../types/interface.products";
import { config } from "../../../config";
import { TErrors } from "../../../types/type.error";
import style from "../../../styles/products/create.module.css"
import { useNavigate } from "react-router-dom";

const Create: React.FC = () => {
    const initialState: IProducts = ({
        _id: '',
        name: '',
        description: '',
        price: 0,
        category: '',
        brand: '',
        stock: 0,
        images: [ '' ],
        attributes: {},
        rating: undefined,
        reviews: [],
    });

    const [ data, setData ] = useState<IProducts>(initialState);
    const [ error, setError ] = useState<TErrors[ 'products' ]>({});
    const [ response, setResponse ] = useState<string>('');
    const navigate = useNavigate();


    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [ name ]: value,
        }));
    };

    const handleAttributesChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            attributes: {
                ...prev.attributes,
                [ name ]: value,
            },
        }));
    };

    const handleImagesChange = (index: number, value: string) => {
        const updatedImages = [ ...data.images ];
        updatedImages[ index ] = value;
        setData((prev) => ({
            ...prev,
            images: updatedImages,
        }));
    };

    const addImageField = () => {
        setData((prev) => ({
            ...prev,
            images: [ ...prev.images, "" ],
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const URL = 'http://localhost:3001/api/v1/create-products/';
        try {
            const res = await fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const resData = await res.json();
            setResponse(resData.message);
        } catch (error) {
            console.error(error);
        }
    };

    const handleClick = () => {
        navigate('/products');
    }

    return (
        <aside className={style[ 'create-products' ]} >
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={data.name}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={data.description}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={data.price}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={data.category}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="brand"
                    placeholder="Brand"
                    value={data.brand}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    value={data.stock}
                    onChange={handleChange}
                    required
                />
                {data.images.map((image, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            placeholder={`Image URL ${index + 1}`}
                            value={image}
                            onChange={(e) => handleImagesChange(index, e.target.value)}
                        />
                    </div>
                ))}
                <button type="button" onClick={addImageField}>
                    Add Image
                </button>
                <input
                    type="text"
                    name="color"
                    placeholder="Color"
                    value={data.attributes?.color || ""}
                    onChange={handleAttributesChange}
                />
                <input
                    type="text"
                    name="weight"
                    placeholder="Weight"
                    value={data.attributes?.weight || ""}
                    onChange={handleAttributesChange}
                />
                <input
                    type="text"
                    name="dimensions"
                    placeholder="Dimensions"
                    value={data.attributes?.dimensions || ""}
                    onChange={handleAttributesChange}
                />
                <button type="submit">Submit</button>
                <button onClick={handleClick}>Cancel</button>
            </form>
        </aside>
    );
};

export default Create;
