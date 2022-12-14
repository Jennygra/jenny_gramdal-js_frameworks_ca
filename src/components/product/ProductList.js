import { useState, useEffect } from "react";
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

  console.log(products.map((product) => product.images));

  return (
    <>
      {products.map((product) => (
        <a key={product.id}>
          <img src={product.images.src} alt={product.images.alt} />
          <p>{product.name}</p>
        </a>
      ))}
    </>
  );
}

export default ProductList;
