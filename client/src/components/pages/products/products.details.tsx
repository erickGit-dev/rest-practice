import { useNavigate, useParams } from "react-router-dom";
import style from "../../../styles/products/details.module.css"
import { useEffect, useState } from "react";
import { config } from "../../../config";
import IProducts from "../../../types/interface.products";

const Details: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const getProducts: string = config.getProducts;
    const URL = `${getProducts}/${id}`;
    const [ error, setError ] = useState<string | null>(null);
    const [ productDetailed, setProductDetailed ] = useState<IProducts>();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(URL);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: IProducts = await response.json();
                setProductDetailed(data);
            } catch (error) {
                setError(error instanceof Error ? error.message : 'An unknown error occurred');
            }
        }

        fetchData();
    }, [ id ]);

    const handleClick = () => {
        navigate('/products');
    }

    if (error) return <div className={style[ 'error' ]}>Error: {error}</div>;

    return (
        <div className={style[ 'products-details' ]}>
            <p>product id: {productDetailed?._id}</p>
            <img src={productDetailed?.image}
                alt={productDetailed?.description}
                width={500} height={500} />
            <p>price: {productDetailed?.price}</p>
            <button onClick={handleClick}>Back</button>
        </div>
    );
}

export default Details;
