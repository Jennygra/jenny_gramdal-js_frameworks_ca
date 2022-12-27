import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API } from "../../constants/api";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async function fetchData() {
      try {
        const response = await fetch(API);

        if (response.ok) {
          const json = await response.json();
          console.log(json);
          setProducts(json);
        } else {
          setError("An error occured");
        }
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>ERROR: An error occured</div>;
  }

  return (
    <>
      {products.map((product) => (
        <Link to={`detail/${product.id}`} key={product.id}>
          <h4>{product.name}</h4>
          <p>ID: {product.id}</p>
        </Link>
      ))}
    </>
  );
}

export default ProductList;
