import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BASE_URL, PRODUCT_PATH } from "../../constants/api";
import { Card, Col } from "react-bootstrap";

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

  return (
    <>
      {products.map((product) => (
        <Col>
          <Card className="productCards-item" style={{ width: "18rem" }}>
            <Link to={`detail/${product.id}`} key={product.id}>
              <div className="productCards-img_container">
                <Card.Img
                  variant="top"
                  src={product.images[0].src}
                  alt={product.images[0].alt}
                />
              </div>
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
              </Card.Body>
            </Link>
          </Card>
        </Col>
      ))}
    </>
  );
}

export default ProductList;
