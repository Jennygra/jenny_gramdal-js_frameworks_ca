import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL, PRODUCT_PATH } from "../../constants/api";
import Heading from "../layout/Heading";
import { Image } from "react-bootstrap";

const productApi = BASE_URL + PRODUCT_PATH;

function Detail() {
  const [product, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const { id } = useParams();

  if (!id) {
    navigate.push("/");
  }

  const url = productApi + "/" + id;

  useEffect(() => {
    (async function fetchData() {
      try {
        const response = await fetch(url);

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
  }, [url]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>ERROR: An error occured</div>;
  }

  return (
    <>
      <Heading title={product.name} />
      <br />
      <Image
        width="100%"
        src={product.images[0].src}
        alt={product.images[0].alt}
      />
      <br />
      <br />
      <p>{product.description}</p>
    </>
  );
}

export default Detail;
