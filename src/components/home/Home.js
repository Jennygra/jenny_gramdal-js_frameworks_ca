import Heading from "../layout/Heading";
import ProductList from "../product/ProductList";
import { Row } from "react-bootstrap";

export default function Home() {
  return (
    <>
      <Heading title="Home" />
      <Row>
        <ProductList />
      </Row>
    </>
  );
}
