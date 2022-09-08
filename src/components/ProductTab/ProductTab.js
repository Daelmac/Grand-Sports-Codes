import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import { Container, Row } from "react-bootstrap";
import { ProductGridWrapper } from "../ProductThumb";
import { useEffect, useState } from "react";
import {getFeaturedProducts,getNewArrivalProducts,getBestSellerProducts} from "../../api/productApi" 

const ProductTab = ({}) => {

  const [featuredProducts, setFeaturedProducts] =useState([])
  const [newArrivalProducts, setNewArrivalProducts] =useState([])
  const [bestSellerProducts, setBestSellerProducts] =useState([])

  useEffect(async() =>{
    const featured_products = await getFeaturedProducts()
    if(featured_products) setFeaturedProducts(featured_products)
    const new_arrival_products = await getNewArrivalProducts()
    if(new_arrival_products) setNewArrivalProducts(new_arrival_products)
    const best_seller_products = await getBestSellerProducts()
    if(best_seller_products) setBestSellerProducts(best_seller_products)
  },[])
  return (
    <div className="product-tab space-mb--r100">
      <Container>
        <Tab.Container defaultActiveKey="our_choice">
          <Nav
            variant="pills"
            className="product-tab__navigation text-center justify-content-center space-mb--r60"
          >
            <Nav.Item>
              <Nav.Link eventKey="new_arrivals">New Arrivals</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="our_choice">Our Choice</Nav.Link>
            </Nav.Item> 
            <Nav.Item>
              <Nav.Link eventKey="best_sellers">Best Sellers </Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="new_arrivals">
              <Row className="space-mb--rm50">
                <ProductGridWrapper
                  products={newArrivalProducts}
                  bottomSpace="space-mb--r50"

                />
              </Row>
            </Tab.Pane>
            <Tab.Pane eventKey="our_choice">
              <Row className="space-mb--rm50">
                <ProductGridWrapper
                  products={featuredProducts}
                  bottomSpace="space-mb--r50"
                />
              </Row>
            </Tab.Pane>
            <Tab.Pane eventKey="best_sellers">
              <Row className="space-mb--rm50">
                <ProductGridWrapper
                  products={bestSellerProducts}
                  bottomSpace="space-mb--r50"
                />
              </Row>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Container>
    </div>
  );
};

export default ProductTab;
