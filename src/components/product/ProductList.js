import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BASE_URL, PRODUCT_PATH } from "../../constants/api";
import { Card } from "react-bootstrap";

const productApi = BASE_URL + PRODUCT_PATH;

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async function fetchData() {
      try {
        const response = await fetch(productApi);

        if (response.ok) {
          const json = await response.json();
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

  console.log(products[0].images[0].src);

  return (
    <>
      {products.map((product, index) => (
        <Card className="productCards-item">
          <Link to={`detail/${product.id}`} key={product.id}>
            <Card.Img
              variant="top"
              src={product.images.src}
              alt={product.images.alt}
            />
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>ID: {product.id}</Card.Text>
              <Card.Text>Index: {index}</Card.Text>
            </Card.Body>
          </Link>
        </Card>
      ))}
    </>
  );
}

export default ProductList;
