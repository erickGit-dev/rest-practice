import React, { useEffect, useState } from "react";
import { IProducts } from "../../types/interface.products";
import { config } from "../../config";
import style from "../../styles/products.module.css";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Products: React.FC = () => {
  const [ products, setProducts ] = useState<IProducts[]>([]);
  const [ loading, setLoading ] = useState<boolean>(true);
  const [ error, setError ] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (id: string | undefined) => {
    navigate(`/products/details/${id}`);
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
  const isDetailsPage = location.pathname.includes('details');

  return (
    <div className={style[ 'products-page' ]}>
      {!isDetailsPage && (
        <div>
          <div className={style[ 'page-label' ]}>Products list</div>
          <div className={style[ 'products-cards' ]}>
            <ul>
              {products.map((product) => (
                <li key={product._id} >
                  <img src={product.images ? product.images[ 0 ] : undefined}
                    alt={product.description}
                    onClick={() => handleClick(product?._id)} />
                  <p>Name: {product.name}</p>
                  <p>Price: {product.price}</p>
                  <button>Add to the car</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      <Outlet />
    </div>
  );
}

export default Products;