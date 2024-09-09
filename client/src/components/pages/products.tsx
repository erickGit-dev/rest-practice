import React, { useEffect, useState } from "react";
import IProducts from "../../types/interface.products";
import { config } from "../../config";
import style from "../../styles/products.module.css";

const Products: React.FC = () => {
  const [ products, setProducts ] = useState<IProducts[]>([]);
  const [ loading, setLoading ] = useState<boolean>(true);
  const [ error, setError ] = useState<string | null>(null);

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
    <div className={style['products-page']}>
      <h3>Products list</h3>
      <div className={style['products-cards']}>
        <ul>
          {
            products.map(products => (
              <li key={products._id}>
                <img src={products.image} alt={products.description}/>
                <p>Id: {products._id}</p>
                <p>Name: {products.name}</p>
                <p>Price: {products.price}</p>
                <p>Customer ID: {products.customer_id}</p>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
}

export default Products;