import { AdminLayout } from "../../../components/Layout";
import { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { IoIosSearch, IoMdFunnel } from "react-icons/io";
import { Container, Row, Col } from "react-bootstrap";
import { SlideDown } from "react-slidedown";
import { getSortedProducts } from "../../../lib/product";
import { getFeaturedProducts } from "../../../api/productApi";
import DataTable from "react-data-table-component";
import { ShopFilter } from "../../../components/Shop";
const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [layout, setLayout] = useState("grid four-column");
  const [sortType, setSortType] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [filterSortType, setFilterSortType] = useState("");
  const [filterSortValue, setFilterSortValue] = useState("");
  const [currentData, setCurrentData] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [shopTopFilterStatus, setShopTopFilterStatus] = useState(false);
  useEffect(async () => {
    const all_products = await getFeaturedProducts();
    if (all_products) setProducts(all_products);
  }, []);
  const columns = [
    {
      name: "Image",
      left: true,
      cell: (row) => (
        <img
          src={process.env.API_URL + row.product_image}
          width={60}
          height={60}
          alt="Player"
        />
      ),
      width: "10%",
      style: {
        padding: "10px",
      },
    },
    {
      name: "Name",
      selector: (row) => row.product_name,
      left: true,
      sortable: true,
      width: "30%",
      cell: (row) => <p>{row.product_name}</p>,
      style: {
        fontWeight: "bold",
      },
    },
    {
      name: "Price",
      selector: (row) => row.product_price,
      left: true,
      sortable: true,
      width: "13%",
      cell: (row) => <p>&#8377; {row.product_price}</p>,
    },

    {
      name: " Discount",
      selector: (row) => row.product_discount,
      left: true,
      sortable: true,
      width: "13%",
      cell: (row) => <p>{row.product_discount}%</p>,
    },
    {
      name: "Final Price",
      left: true,
      cell: (row) => (
        <span>
          &#8377;{" "}
          {row.product_discount && row.product_discount > 0
            ? (
                row.product_price -
                row.product_price * (row.product_discount / 100)
              ).toFixed(2)
            : row.product_price}
        </span>
      ),
      width: "13%",
    },
    {
      name: "Available",
      left: true,
      cell: (row) => (
        <span
          className={row.product_is_available ? "text-success" : "text-danger"}
        >
          {row.product_is_available ? "Yes" : "No"}
        </span>
      ),
      width: "10%",
      style: {
        fontWeight: "bold",
      },
    },
    {
      name: "Action",
      left: true,
      cell: (row) => (
        <>
          <MdDelete
            color="red"
            fontSize="1.5em"
            role="button"
            onClick={(row) => onDeleteProduct(row)}
          />
        </>
      ),
      width: "10%",
      style: {
        fontWeight: "bold",
      },
    },
  ];
  const onDeleteProduct = (product) => {
    console.log("IN Delete==>", product);
  };
  const getSortParams = (sortType, sortValue) => {
    setSortType(sortType);
    setSortValue(sortValue);
  };

  const getFilterSortParams = (sortType, sortValue) => {
    setFilterSortType(sortType);
    setFilterSortValue(sortValue);
  };

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
      setCurrentData(filterCurrentData);
    } else {
      setCurrentData(sortedProducts);
    }
  }, [
    products,
    sortType,
    sortValue,
    filterSortType,
    filterSortValue,
    searchText,
  ]);

  return (
    <AdminLayout title="Featured Products">
      <div className="shop-page-content">
        <Container className={"grid four-column"}>
          <Row className="align-items-center mt-5">
            <Col md={5} className="text-center text-md-left">
              Total Products : {products.length}
              {/* Showing {currentData.length} of {products.length} result */}
            </Col>

            <Col md={7}>
              <div className="shop-header__filter-icons justify-content-center justify-content-md-end">
                <div className="search-widget mr-5">
                  <form>
                    <input
                      type="search"
                      placeholder="Search products ..."
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                    <button type="button">
                      <IoIosSearch />
                    </button>
                  </form>
                </div>
                <div className="single-icon advance-filter-icon mt-2">
                  <button
                    onClick={() => setShopTopFilterStatus(!shopTopFilterStatus)}
                    className={shopTopFilterStatus ? "active" : ""}
                  >
                    <IoMdFunnel /> Filter
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>

        {/* shop header filter */}
        <SlideDown closed={shopTopFilterStatus ? false : true}>
          <ShopFilter products={products} getSortParams={getSortParams} />
        </SlideDown>

        {/* shop page body */}
        <Container className="mt-5">
          <DataTable columns={columns} data={currentData} pagination />
        </Container>
      </div>
    </AdminLayout>
  );
};

export default FeaturedProducts;
