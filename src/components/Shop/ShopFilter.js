import { Container, Row, Col } from "react-bootstrap";
import {
  getIndividualCategories,
  setActiveSort
} from "../../lib/product";

const ShopFilter = ({ products, getSortParams , setShopTopFilterStatus,shopTopFilterStatus}) => {
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
                        setShopTopFilterStatus(!shopTopFilterStatus)
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
                            setShopTopFilterStatus(!shopTopFilterStatus)
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
          <Col lg={3} md={6} className="space-mb-mobile-only--30">
            <div className="single-filter-widget">
              <h2 className="single-filter-widget__title">Types</h2>
           
                <ul className="single-filter-widget__list">
                  <li>
                    <button
                      onClick={(e) => {
                        getSortParams("typeSort", "default");
                        setActiveSort(e);
                        setShopTopFilterStatus(!shopTopFilterStatus)
                      }}
                    >
                     All
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={(e) => {
                        getSortParams("typeSort", "newProducts");
                        setActiveSort(e);
                        setShopTopFilterStatus(!shopTopFilterStatus)
                      }}
                    >
                     New Products
                    </button>
                  </li>   
                  <li>
                    <button
                      onClick={(e) => {
                        getSortParams("typeSort", "featuredProducts");
                        setActiveSort(e);
                        setShopTopFilterStatus(!shopTopFilterStatus)
                      }}
                    >
                     Featured Products
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={(e) => {
                        getSortParams("typeSort", "bestSellingProducts");
                        setActiveSort(e);
                        setShopTopFilterStatus(!shopTopFilterStatus)
                      }}
                    >
                     Best Selling products
                    </button>
                  </li>
    
                
                </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ShopFilter;
