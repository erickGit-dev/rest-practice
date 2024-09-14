import React, { useEffect, useState } from "react";
import IProducts from "../../types/interface.products";
import { config } from "../../config";
import style from "../../styles/products.module.css";
import { useNavigate } from "react-router-dom";

const Products: React.FC = () => {
  const [ products, setProducts ] = useState<IProducts[]>([]);
  const [ loading, setLoading ] = useState<boolean>(true);
  const [ error, setError ] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/details');
  }

  useEffect(() => {
    const fetchProducts = async () => {
      const getProducts: string = config.getProducts;
      try {
        const response = await fetch(getProducts);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: IProducts[] = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) return <div className={style[ 'loading' ]}>Loading...</div>;
  if (error) return <div className={style[ 'error' ]}>Error: {error}</div>;

  return (
    <div className={style[ 'products-page' ]}>
      <div className={style[ 'page-label' ]}>Products list</div>
      <div className={style[ 'products-cards' ]}>
        <ul>
          {
            products.map((products) => (
              <li key={products._id} onClick={handleClick}>
                <img src={products.image} alt={products.description} />
                <p>Name: {products.name}</p>
                <p>Price: {products.price}</p>
              </li>
            ))
          }
        </ul>
      </div>
    </div>  
  );
}

export default Products;