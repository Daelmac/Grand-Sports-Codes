import { ProductGridListWrapper } from "../../components/ProductThumb";
import { Row } from "react-bootstrap";

const ShopProducts = ({ products, layout }) => {
  return (
    <div className="shop-products" data-aos="fade-up">
      <Row className={layout}>
        <ProductGridListWrapper
          products={products}
          bottomSpace="space-mb--50"
        />
      </Row>
    </div>
  );
};

export default ShopProducts;
