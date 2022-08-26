import { useState, useEffect } from "react";
import { connect } from "react-redux";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import Paginator from "react-hooks-paginator";
import { SlideDown } from "react-slidedown";
import { LayoutTwo } from "../../components/Layout";
import { BreadcrumbOne } from "../../components/Breadcrumb";
import { getSortedProducts } from "../../lib/product";
import {getAllProducts} from "../../api/productApi" 
import {
  ShopHeader,
  ShopFilter,
  ShopSidebar,
  ShopProducts
} from "../../components/Shop";

const LeftSidebar = () => {
  const [products, setProducts] = useState([]);
  const [layout, setLayout] = useState("grid four-column");
  const [sortType, setSortType] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [filterSortType, setFilterSortType] = useState("");
  const [filterSortValue, setFilterSortValue] = useState("");
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [shopTopFilterStatus, setShopTopFilterStatus] = useState(false);
  const [searchText,setSearchText] = useState("")

  const pageLimit = 20;

  const getLayout = (layout) => {
    setLayout(layout);
  };

  const getSortParams = (sortType, sortValue) => {
    setSortType(sortType);
    setSortValue(sortValue);
  };
  const getSearchParam=(search_text)=>{
    setSearchText(search_text);
  }
  const getFilterSortParams = (sortType, sortValue) => {
    setFilterSortType(sortType);
    setFilterSortValue(sortValue);
  };
  useEffect(async() => {
    const all_products = await getAllProducts()
    if (all_products) setProducts(all_products)
  },[])
  useEffect(() => {
    let sortedProducts = getSortedProducts(products, sortType, sortValue);
    const filterSortedProducts = getSortedProducts(
      sortedProducts,
      filterSortType,
      filterSortValue
    );
    sortedProducts = filterSortedProducts;
    setSortedProducts(sortedProducts);
    if (searchText != "") {
      const filterCurrentData = currentData.filter(
        (item) =>
          item.product_name &&
          item.product_name.toLowerCase().includes(searchText.toLowerCase())
      );
      setCurrentData(filterCurrentData.slice(offset, offset + pageLimit));
    } else {
      setCurrentData(sortedProducts.slice(offset, offset + pageLimit));
    }
    // setCurrentData(sortedProducts.slice(offset, offset + pageLimit));
  }, [offset, products, sortType, sortValue, filterSortType, filterSortValue,searchText]);

  return (
    <LayoutTwo aboutOverlay={false}>
      {/* breadcrumb */}
      {/* <BreadcrumbOne
        pageTitle="Shop Left Sidebar"
        backgroundImage="/assets/images/backgrounds/breadcrumb-bg-1.png"
      >
        <ul className="breadcrumb__list">
          <li>
            <Link href="/" as={process.env.PUBLIC_URL + "/"}>
              <a>Home</a>
            </Link>
          </li>

          <li>Shop Left Sidebar</li>
        </ul>
      </BreadcrumbOne> */}
      <div className="shop-page-content">
        {/* shop page header */}
        <ShopHeader
          getLayout={getLayout}
          getFilterSortParams={getFilterSortParams}
          productCount={products.length}
          sortedProductCount={currentData.length}
          shopTopFilterStatus={shopTopFilterStatus}
          setShopTopFilterStatus={setShopTopFilterStatus}
        />

        {/* shop header filter */}
        <SlideDown closed={shopTopFilterStatus ? false : true}>
          <ShopFilter products={products} getSortParams={getSortParams} />
        </SlideDown>

        {/* shop page body */}
       
        <div className="shop-page-content__body space-mt--r100 space-mb--r130">
        {(sortedProducts.length != 0)?
         <Container>
         <Row>
           <Col
             lg={3}
             className="order-2 order-lg-1 space-mt-mobile-only--50"
           >
             {/* shop sidebar */}
             <ShopSidebar
               products={products}
               getSortParams={getSortParams}
               getSearchParam={getSearchParam}
             />
           </Col>

           <Col lg={9} className="order-1 order-lg-2">
             {/* shop products */}
             <ShopProducts layout={layout} products={currentData} />
             {console.log(currentData)}
             {/* shop product pagination */}
             <div className="pro-pagination-style">
               <Paginator
                 totalRecords={sortedProducts.length}
                 pageLimit={pageLimit}
                 pageNeighbours={2}
                 setOffset={setOffset}
                 currentPage={currentPage}
                 setCurrentPage={setCurrentPage}
                 pageContainerClass="mb-0 mt-0"
                 pagePrevText="«"
                 pageNextText="»"
               />
             </div>
           </Col>
         </Row>
       </Container>:
       <span className="d-flex align-items-center justify-content-center">Products not found</span>
        }
         
        </div>
      </div>
    </LayoutTwo>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.productData
  };
};

export default connect(mapStateToProps)(LeftSidebar);
