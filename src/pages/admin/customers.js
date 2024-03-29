import { AdminLayout } from "../../components/Layout";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { IoIosSearch } from "react-icons/io";
import { Container, Row, Col } from "react-bootstrap";
import {
  getCustomers,
  disableCustomer,
  enableCustomer,
} from "../../api/userApi";
import DataTable from "react-data-table-component";
import { useToasts } from "react-toast-notifications";
import customStyles from "../../assets/scss/style/tableStyle";

const Customers = ({ userDetails }) => {
  const [customers, setCustomers] = useState([]);
  const [currentCustomers, setcurrentCustomers] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState("all");
  const [toggleFlag, setToggleFlag] = useState(false);
  const { addToast } = useToasts();

  // get customer data and manage filter
  useEffect(async () => {
    let all_customers = await getCustomers(userDetails, filter);
    if (all_customers) setCustomers(all_customers);
  }, [filter, toggleFlag]);

  // Manage search text
  useEffect(() => {
    if (searchText != "") {
      const filterCurrentData = currentCustomers.filter(
        (item) =>
          item.customer_name &&
          (item.customer_name
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
            item.customer_id.toLowerCase().includes(searchText.toLowerCase()))
      );
      setcurrentCustomers(filterCurrentData);
    } else {
      setcurrentCustomers(customers);
    }
  }, [customers, searchText]);

  //change customer activation status
  const ChnageCustomerStatus = async (e, row) => {
    if (row.customer_permitted) {
      let response = await disableCustomer(userDetails, row.customer_id);
      if (response?.status === "success") {
        setToggleFlag(!toggleFlag);
        addToast("Customer successfully Deactivated.", {
          appearance: "success",
          autoDismiss: true,
        });
      } else
        addToast("Some problem occurred,please try again.", {
          appearance: "error",
          autoDismiss: true,
        });
    } else {
      let response = await enableCustomer(userDetails, row.customer_id);
      if (response.status === "success") {
        setToggleFlag(!toggleFlag);
        addToast("Customer successfully Activated.", {
          appearance: "success",
          autoDismiss: true,
        });
      } else
        addToast("Some problem occurred,please try again.", {
          appearance: "error",
          autoDismiss: true,
        });
    }
  };

  //table columns
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
        <div className="switch-container">
          <label>
            <input
              checked={row.customer_permitted}
              onChange={(e) => {
                ChnageCustomerStatus(e, row);
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
      width: "10%",
      style: {
        fontWeight: "bold",
      },
    },
  ];
  return (
    <AdminLayout title="All customers">
      <div className="shop-page-content">
        <Container className={"grid four-column"}>
          <Row className="align-items-center mt-5">
            <Col md={5} className="text-center text-md-left">
              Total Customers : {customers.length}
            </Col>

            <Col md={7}>
              <div className="shop-header__filter-icons justify-content-center justify-content-md-end">
                <div className="search-widget mr-5">
                  <form>
                    <input
                      type="search"
                      placeholder="Search customers ..."
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                    <button type="button">
                      <IoIosSearch />
                    </button>
                  </form>
                </div>
                <div className="single-icon filter-dropdown mt-2">
                  <select onChange={(e) => setFilter(e.target.value)}>
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </Col>
          </Row>
        </Container>

        <Container className="mt-5">
          <DataTable
            columns={columns}
            data={currentCustomers}
            customStyles={customStyles}
            highlightOnHover
            pagination
          />
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
