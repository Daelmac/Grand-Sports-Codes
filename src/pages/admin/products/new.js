import { AdminLayout } from "../../../components/Layout";
import { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import Link from "next/link";
import { MdViewComfy, MdApps, MdList, MdEdit, MdDelete } from "react-icons/md";
import { IoMdFunnel } from "react-icons/io";
import { Container, Row, Col } from "react-bootstrap";
import Paginator from "react-hooks-paginator";
import { SlideDown } from "react-slidedown";
import { getSortedProducts } from "../../../lib/product";
import { getNewArrivalProducts } from "../../../api/productApi";
import DataTable from "react-data-table-component";
import Navbar from 'react-bootstrap/Navbar';
import {
  ShopHeader,
  ShopFilter,
  ShopSidebar,
  ShopProducts,
} from "../../../components/Shop";
const NewProducts = () => {
  const [products, setProducts] = useState([]);
  const [seatchText, setSeatchText] = useState("");
  const [layout, setLayout] = useState("grid four-column");
  const [sortType, setSortType] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [filterSortType, setFilterSortType] = useState("");
  const [filterSortValue, setFilterSortValue] = useState("");
  const [currentData, setCurrentData] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [shopTopFilterStatus, setShopTopFilterStatus] = useState(false);
  useEffect(async () => {
    const all_products = await getNewArrivalProducts();
    if (all_products) setProducts(all_products);
  }, []);
  const columns = [
    {
      name: "Image",
      left: true,
      cell: (row) => (
        <img
          src={"http://" + row.product_image}
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
  // useEffect(async () => {
  //   const all_products = await getAllProducts();
  //   if (all_products) setProducts(all_products);
  // }, []);
  useEffect(() => {
    let sortedProducts = getSortedProducts(products, sortType, sortValue);
    const filterSortedProducts = getSortedProducts(
      sortedProducts,
      filterSortType,
      filterSortValue
    );
    sortedProducts = filterSortedProducts;
    setSortedProducts(sortedProducts);
    if (seatchText != "") {
      const filterCurrentData = currentData.filter(
        (item) =>
          item.product_name &&
          item.product_name.toLowerCase().includes(seatchText.toLowerCase())
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
    seatchText,
  ]);

  return (
    <AdminLayout title="New Arrival Products">
      <div className="shop-page-content">
        <Container className={"grid four-column"}>
          <Row className="align-items-center mt-5">
            <Col md={5} className="text-center text-md-left">
              Total Products : {products.length}
              {/* Showing {currentData.length} of {products.length} result */}
            </Col>

            <Col md={7}>
              <div className="shop-header__filter-icons justify-content-center justify-content-md-end">
                <input
                  type="text"
                  placeholder="Search.."
                  className="search mr-5 border border-dark rounded"
                  onChange={(e) => setSeatchText(e.target.value)}
                />
                <div className="single-icon advance-filter-icon">
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

export default NewProducts;
