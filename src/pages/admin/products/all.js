import { AdminLayout } from "../../../components/Layout";
import { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import Link from "next/link";
import { MdViewComfy, MdApps, MdList, MdEdit, MdDelete } from "react-icons/md";
import { IoIosSearch, IoMdFunnel } from "react-icons/io";
import { Container, Row, Col } from "react-bootstrap";
import { useToasts } from "react-toast-notifications";
import Modal from 'react-bootstrap/Modal';
import { SlideDown } from "react-slidedown";
import { getSortedProducts } from "../../../lib/product";
import Router from "next/router";
import {
  getAllProducts,
  MakeFeaturedProduct,
  RemoveFeaturedProduct,
  MakeNewProduct,
  RemoveBestSellerProduct,
  MakeBestSellerProduct,
  RemoveNewProduct,
  removeProduct
} from "../../../api/productApi";
import DataTable from "react-data-table-component";
import { useDispatch } from 'react-redux'


import { ShopFilter } from "../../../components/Shop";
const AllProducts = ({userDetails}) => {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sortType, setSortType] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [filterSortType, setFilterSortType] = useState("");
  const [filterSortValue, setFilterSortValue] = useState("");
  const [currentData, setCurrentData] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [shopTopFilterStatus, setShopTopFilterStatus] = useState(false);
  const [toggleFlag,setToggleFlag] = useState(false);
  const [tempProduct, setTempProduct] = useState(null)
  const [showDeleteModel, setShowDeleteModel] = useState(false);

  const handleClose = () => setShowDeleteModel(false);
  const handleShow = (e, product) =>{
    setTempProduct(product)
    setShowDeleteModel(true)
  };

  const dispatch = useDispatch()
  const { addToast } = useToasts();

  useEffect(async () => {
    const all_products = await getAllProducts();
    if (all_products) setProducts(all_products);
  }, [toggleFlag]);
  const NewProducttoggle = async (e, row) => {
    if(row.product_is_new){
      let response = await dispatch( RemoveNewProduct(userDetails,row.product_id))
      if(response.status === "success") {
        setToggleFlag(!toggleFlag)
        addToast("Product successfully removed form new product.", {
          appearance: "success",
          autoDismiss: true,
        });
      }
      else addToast("Some problem occurred,please try again.", {
          appearance: "error",
          autoDismiss: true,
        });
    }  
    else{
      let response = await dispatch( MakeNewProduct(userDetails,row.product_id))
      if(response.status === "success"){
        setToggleFlag(!toggleFlag)
        addToast("Product successfully Added to new product.", {
          appearance: "success",
          autoDismiss: true,
        });
      }
      else addToast("Some problem occurred,please try again.", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };
  const FeaturedProducttoggle = async(e, row) => {
    if(row.product_is_new){
      let response = await dispatch( RemoveFeaturedProduct(userDetails,row.product_id))
      if(response.status === "success"){
        setToggleFlag(!toggleFlag)
        addToast("Product successfully removed form featured product.", {
          appearance: "success",
          autoDismiss: true,
        });
      }
      else addToast("Some problem occurred,please try again.", {
        appearance: "error",
        autoDismiss: true,
      });
    }  
    else{
      let response = await dispatch( MakeFeaturedProduct(userDetails,row.product_id))
      if(response.status === "success"){
        setToggleFlag(!toggleFlag)
        addToast("Product successfully Added to featured product.", {
          appearance: "success",
          autoDismiss: true,
        });
      }
      else addToast("Some problem occurred,please try again.", {
        appearance: "error",
        autoDismiss: true,
      });
    }

  };
  const BestSellerProducttoggle = async(e, row) => {
    if(row.product_is_new){
      let response = await dispatch( RemoveBestSellerProduct(userDetails,row.product_id))
      if(response.status === "success"){
        setToggleFlag(!toggleFlag)
        addToast("Product successfully removed form best selling product.", {
          appearance: "success",
          autoDismiss: true,
        });
      }
      else addToast("Some problem occurred,please try again.", {
        appearance: "error",
        autoDismiss: true,
      });
    }  
    else{
      let response = await dispatch( MakeBestSellerProduct(userDetails,row.product_id))
      if(response.status === "success"){
        setToggleFlag(!toggleFlag)
        addToast("Product successfully Added to best selling product.", {
          appearance: "success",
          autoDismiss: true,
        });
      }
      else addToast("Some problem occurred,please try again.", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };
  const customStyles = {
    headRow: {
      style: {
        border: "none",
      },
    },
    headCells: {
      style: {
        color: "#202124",
        fontSize: "14px",
      },
    },
    rows: {
      highlightOnHoverStyle: {
        backgroundColor: "#fff8f7",
        borderBottomColor: "#FFFFFF",
        outline: "1px solid #FFFFFF",
      },
    },
    pagination: {
      style: {
        border: "none",
      },
    },
  };
  const columns = [
    {
      name: "Image",
      left: true,
      cell: (row) => (
        <img
          src={process.env.API_URL + row.product_image}
          width={60}
          height={60}
          alt="Product"
        />
      ),
      width: "8%",
      style: {
        padding: "10px",
      },
    },
    {
      name: "Name",
      selector: (row) => row.product_name,
      left: true,
      sortable: true,
      width: "18%",
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
      width: "9%",
      cell: (row) => <p>&#8377; {row.product_price}</p>,
    },

    // {
    //   name: "Discount",
    //   selector: (row) => row.product_discount,
    //   left: true,
    //   sortable: true,
    //   width: "1%",
    //   cell: (row) => <p>{row.product_discount}%</p>,
    // },
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
          {row.product_discount ? "(-" + row.product_discount + "%" + ")" : ""}
        </span>
      ),
      width: "15%",
    },
    {
      name: "New",
      left: true,
      cell: (row) => (
        <div className="switch-container">
          <label>
            <input
              checked={row.product_is_new}
              onChange={(e) => {
                NewProducttoggle(e, row);
              }}
              className="switch"
              type="checkbox"
            />
            <div>
              <div>{}</div>
            </div>
          </label>
        </div>
      ),
      width: "9%",
    },
    {
      name: "Featuted",
      left: true,
      cell: (row) => (
        <div className="switch-container">
          <label>
            <input
              checked={row.product_is_featured}
              onChange={(e) => FeaturedProducttoggle(e, row)}
              className="switch"
              type="checkbox"
            />
            <div>
              <div></div>
            </div>
          </label>
        </div>
      ),
      width: "10%",
    },
    {
      name: "Best Selling",
      left: true,
      cell: (row) => (
        <div className="switch-container">
          <label>
            <input
              checked={row.product_is_best_seller}
              onChange={(e) => BestSellerProducttoggle(e, row)}
              className="switch"
              type="checkbox"
            />
            <div>
              <div></div>
            </div>
          </label>
        </div>
      ),
      width: "12%",
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
          <MdEdit
            color="primary"
            fontSize="2em"
            class="mr-1"
            role="button"
            onClick={(e) => onEditProduct(e,row)}
          />
          <MdDelete
            color="red"
            fontSize="2em"
            role="button"
            onClick={(e) => handleShow(e,row)}
          />
        </>
      ),
      width: "8%",
      style: {
        fontWeight: "bold",
      },
    },
  ];
  const onEditProduct = (e,product) => {
    console.log(product)
    Router.push(`/admin/products/${product.product_id}`)
  };
  const onDeleteProduct = async() => {
    setShowDeleteModel(false)
    let response = await dispatch(removeProduct(userDetails,tempProduct?.product_id))
    if(response){
      if(response.status === "success"){
        setToggleFlag(!toggleFlag)
        addToast("Product successfully Deleted.", {
          appearance: "success",
          autoDismiss: true,
        });
      }
      else addToast("Some problem occurred,please try again.", {
        appearance: "error",
        autoDismiss: true,
      });
  }else{
    addToast("Some problem occurred,please try again.", {
      appearance: "error",
      autoDismiss: true,
    });
  }
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
    <AdminLayout title="All Products">
      <div className="shop-page-content">
        <Container className={"grid four-column"}>
          <Row className="align-items-center mt-5">
            <Col md={5} className="text-center text-md-left">
              Total Products : {products.length}
            </Col>

            <Col md={7}>
              <div className="shop-header__filter-icons justify-content-center justify-content-md-end">
                <div className="search-widget mr-5">
                  <form>
                    <input type="search" placeholder="Search products ..."  onChange={(e) => setSearchText(e.target.value)}/>
                    <button type="button">
                      <IoIosSearch />
                    </button>
                  </form>
                </div>
                <div className="single-icon filter-dropdown mt-2">
                  <select
                    onChange={(e) =>
                      getFilterSortParams("typeSort", e.target.value)
                    }
                  >
                    <option value="default">Default</option>
                    <option value="newProducts">New Products</option>
                    <option value="featuredProducts">Featured Products</option>
                    <option value="bestSellingProducts">
                      Best Selling products
                    </option>
                  </select>
                </div>
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
          <DataTable
            columns={columns}
            data={currentData}
            customStyles={customStyles}
            highlightOnHover
            pagination
          />
        </Container>
      </div>
      {/* delete model */}
      <Modal show={showDeleteModel} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete,<b>{tempProduct?.product_name}</b> ?</Modal.Body>
        <Modal.Footer>
        <button className="cancel-btn-small" onClick={handleClose}
          >
            Cancel
          </button>
          <button className="lezada-button lezada-button--small" onClick={onDeleteProduct}
          >
            Delete
          </button>
        </Modal.Footer>
      </Modal>
    </AdminLayout>
  );
};
const mapStateToProps = (state) => {
  return {
    userDetails: state.currentUserData,
  };
};
export default connect(mapStateToProps, null)(AllProducts);
