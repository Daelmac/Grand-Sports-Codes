import { AdminLayout } from "../../components/Layout";
import { Fragment, useState, useEffect} from "react";
import { connect } from "react-redux";
import Link from "next/link";
import { MdViewComfy, MdApps, MdList, MdEdit, MdDelete } from "react-icons/md";
import { IoMdFunnel } from "react-icons/io";
import { Container, Row, Col } from "react-bootstrap";
import { getCustomers } from "../../api/userApi";
import DataTable from "react-data-table-component";
import { useDispatch } from 'react-redux'


const Customers = ({userDetails}) => {
  const [customers, setCustomers] = useState([]);
  const [currentCustomers, setcurrentCustomers] = useState([]);
  const [seatchText, setSeatchText] = useState("");
  const [filter,setFilter] = useState("all")
  const dispatch = useDispatch()

  useEffect(async () => {
    let all_customers= await dispatch( getCustomers(userDetails,filter))
    if(all_customers) setCustomers(all_customers)
  }, [filter]);
  useEffect(() => {
    if (seatchText != "") {
      const filterCurrentData = currentCustomers.filter(
        (item) =>
          item.customer_name &&
          item.customer_name.toLowerCase().includes(seatchText.toLowerCase())
      );
      setcurrentCustomers(filterCurrentData);
    } else {
      setcurrentCustomers(customers);
    }
  }, [
    customers,
    seatchText,
  ]);
  const onDeleteProduct = (product) => {
    console.log("IN Delete==>", product);
  };
  const columns = [
    {
      name: "Id",
      selector: (row) => row.customer_id,
      left: true,
      sortable: true,
      width: "30%",
      cell: (row) => <p>{row.customer_id}</p>,
    },
    {
      name: "Name",
      selector: (row) => row.customer_name,
      left: true,
      sortable: true,
      width: "30%",
      cell: (row) => <p>{row.customer_name}</p>,
      style: {
        fontWeight: "bold",
      },
    },
    {
      name: "Email",
      selector: (row) => row.customer_email,
      left: true,
      sortable: true,
      width: "20%",
      cell: (row) => <p>{row.customer_email}</p>,
    },
    {
      name: "Active",
      left: true,
      cell: (row) => (
        <span
          className={row.customer_permitted ? "text-success" : "text-danger"}
        >
          {row.customer_permitted ? "Yes" : "No"}
        </span>
      ),
      width: "10%",
      style: {
        fontWeight: "bold",
      },
    },
    
  ];
  return (
    <AdminLayout title="Featured Products">
      <div className="shop-page-content">
        <Container className={"grid four-column"}>
          <Row className="align-items-center mt-5">
            <Col md={5} className="text-center text-md-left">
              Total Customers : {customers.length}
            </Col>

            <Col md={7}>
              <div className="shop-header__filter-icons justify-content-center justify-content-md-end">
                <input
                  type="text"
                  placeholder="Search.."
                  className="search mr-5 border border-dark rounded"
                  onChange={(e) => setSeatchText(e.target.value)}
                />
                <div className="single-icon filter-dropdown">
                  <select
                    onChange={(e) =>
                      setFilter(e.target.value)
                    }
                  >
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </Col>
          </Row>
        </Container>

        {/* shop header filter */}
        {/* <SlideDown closed={shopTopFilterStatus ? false : true}>
          <ShopFilter products={products} getSortParams={getSortParams} />
        </SlideDown> */}

        {/* shop page body */}
        <Container className="mt-5">
          <DataTable columns={columns} data={currentCustomers} pagination />
        </Container>
      </div>
    </AdminLayout>
  );
};
const mapStateToProps = (state) => {
  return {
    userDetails: state.currentUserData,
  };
};
export default connect(mapStateToProps, null)(Customers);
