import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../../constants/api";

function Detail() {
  const [product, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const { id } = useParams();

  if (!id) {
    navigate.push("/");
  }

  const url = API + "/" + id;

  useEffect(() => {
    (async function fetchData() {
      try {
        const response = await fetch(url);

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
  }, [url]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>ERROR: An error occured</div>;
  }

  return (
    <>
      <h4>{product.name}</h4>
      <p>ID: {product.id}</p>
      <p>{product.description}</p>
    </>
  );
}

export default Detail;
