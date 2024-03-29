import { AdminLayout } from "../../../components/Layout";
import { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { Container, Row, Col } from "react-bootstrap";
import { get_all_purchases } from "../../../api/orderApi";
import DataTable from "react-data-table-component";
import Router from "next/router";
import { MdEdit } from "react-icons/md";
import customStyles from "../../../assets/scss/style/tableStyle";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [currentOrders, setCurrentOrders] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState(null);

  // get all order details
  useEffect(async () => {
    let all_purchases = await get_all_purchases(filter);
    if (all_purchases) setOrders(all_purchases);
  }, [filter]);

  // manage filter and search
  useEffect(() => {
    if (searchText != "") {
      const filterCurrentData = currentOrders.filter(
        (item) =>
          item.order_id &&
          (item.order_id.toLowerCase().includes(searchText.toLowerCase()) ||
            item?.customer?.id.toLowerCase().includes(searchText.toLowerCase()))
      );
      setCurrentOrders(filterCurrentData);
    } else {
      setCurrentOrders(orders);
    }
  }, [orders, searchText]);

  //on edit button click go to edit page
  const onEditOrder = (e, order) => {
    console.log(order);
    Router.push(`/admin/orders/${order.order_id}`);
  };

  //table data
  const columns = [
    {
      name: "Order ID",
      selector: (row) => row.order_id,
      left: true,
      sortable: true,
      width: "15%",
      cell: (row) => <p>{row.order_id}</p>,
      style: {
        fontWeight: "bold",
      },
    },
    {
      name: "Date",
      selector: (row) => row.order_date,
      left: true,
      sortable: true,
      width: "10%",
      cell: (row) => (
        <p>
          {new Date(row.order_date).toLocaleDateString("en-IN", {
            timeZone: "Asia/Kolkata",
          })}
        </p>
      ),
    },
    {
      name: "Receipt ID",
      selector: (row) => row.receipt_id,
      left: true,
      sortable: true,
      width: "14%",
      cell: (row) => <p>{row.receipt_id}</p>,
    },
    {
      name: "Customer ID",
      selector: (row) => row.customer_id,
      left: true,
      sortable: true,
      width: "14%",
      cell: (row) => <p>{row.customer.id}</p>,
    },
    {
      name: "Customer Name",
      selector: (row) => row.customer_id,
      left: true,
      sortable: true,
      width: "15%",
      cell: (row) => <p>{row.customer.name}</p>,
    },
    {
      name: "Amount",
      selector: (row) => row.order_total_amount,
      left: true,
      sortable: true,
      width: "9%",
      cell: (row) => <p>&#8377; {row.order_total_amount}</p>,
      style: {
        fontWeight: "bold",
      },
    },
    {
      name: "Status",
      selector: (row) => row.order_status,
      left: true,
      sortable: true,
      width: "12%",
      cell: (row) => (
        <div>
          {row.order_status == "Pending" ? (
            <p className="pending-text">{row.order_status}</p>
          ) : null}
          {row.order_status == "Confirmed" ? (
            <p className="confirm-text">{row.order_status}</p>
          ) : null}
          {row.order_status == "Shipped" ? (
            <p className="shipped-text">{row.order_status}</p>
          ) : null}
          {row.order_status == "Delivered" ? (
            <p className="delivered-text">{row.order_status}</p>
          ) : null}
          {row.order_status == "Cancelled" ? (
            <p className="cancelled-text">{row.order_status}</p>
          ) : null}
          {row.order_status == "Refunded" ? (
            <p className="refunded-text">{row.order_status}</p>
          ) : null}
        </div>
      ),
    },
    {
      name: "Action",
      left: true,
      cell: (row) => (
        <>
          <MdEdit
            fontSize="2em"
            role="button"
            onClick={(e) => onEditOrder(e, row)}
          />
        </>
      ),
      width: "8%",
      style: {
        fontWeight: "bold",
      },
    },
  ];
  return (
    <AdminLayout title="All Orders">
      <div className="shop-page-content">
        <Container className={"grid four-column"}>
          <Row className="align-items-center mt-5">
            <Col md={5} className="text-center text-md-left">
              Total Orders : {orders.length}
            </Col>

            <Col md={7}>
              <div className="shop-header__filter-icons justify-content-center justify-content-md-end">
                <div className="search-widget mr-5">
                  <form>
                    <input
                      type="search"
                      placeholder="Search orders ..."
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                    <button type="button">
                      <IoIosSearch />
                    </button>
                  </form>
                </div>
                <div className="single-icon filter-dropdown mt-2">
                  <select onChange={(e) => setFilter(e.target.value)}>
                    <option value={null}>All</option>
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                    <option value="Refunded">Refunded</option>
                  </select>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <Container className="mt-5">
          <DataTable
            columns={columns}
            data={currentOrders}
            customStyles={customStyles}
            highlightOnHover
            pagination
          />
        </Container>
      </div>
    </AdminLayout>
  );
};

export default AllOrders;
