import { Container, Row, Col } from "react-bootstrap";
import {
  getIndividualCategories,
  setActiveSort
} from "../../lib/product";

const ShopFilter = ({ products, getSortParams }) => {
  const categories = getIndividualCategories(products);


  return (
    <div className="shop-advance-filter">
      <Container className="space-pt--50 space-pb--50">
        <Row>
          <Col lg={3} md={6} className="space-mb-mobile-only--30">
            <div className="single-filter-widget">
              <h2 className="single-filter-widget__title">Categories</h2>

              {categories.length > 0 ? (
                <ul className="single-filter-widget__list">
                  <li>
                    <button
                      onClick={(e) => {
                        getSortParams("category", "");
                        setActiveSort(e);
                      }}
                    >
                      All categories
                    </button>
                  </li>
                  {categories.map((category, i) => {
                    return (
                      <li key={i}>
                        <button
                          onClick={(e) => {
                            getSortParams("category", category);
                            setActiveSort(e);
                          }}
                        >
                          {category}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                "No categories found"
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ShopFilter;
