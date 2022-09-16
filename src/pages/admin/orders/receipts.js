import { AdminLayout } from "../../../components/Layout";
import { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { Container, Row, Col } from "react-bootstrap";
import { get_all_receipts } from "../../../api/orderApi";
import DataTable from "react-data-table-component";
import Router from "next/router";
import customStyles from "../style/tableStyle";

const Receipts = () => {
  const [receipts, setReceipts] = useState([]);
  const [currentReceipts, setCurrentReceipts] = useState([]);
  const [searchText, setSearchText] = useState("");

  // get receipt data
  useEffect(async () => {
    let all_receipts = await get_all_receipts();
    if (all_receipts) setReceipts(all_receipts);
  }, []);

  // manage receipt search text
  useEffect(() => {
    if (searchText != "") {
      const filterCurrentData = currentReceipts.filter(
        (item) =>
          item.receipt_id &&
          item.receipt_id.toLowerCase().includes(searchText.toLowerCase())
      );
      setCurrentReceipts(filterCurrentData);
    } else {
      setCurrentReceipts(receipts);
    }
  }, [receipts, searchText]);

  //on order view button go to order details page
  const onOrderClick = (id) => {
    Router.push(`/admin/orders/${id}`);
  };

  // receipt table columns
  const columns = [
    {
      name: "Receipt ID",
      selector: (row) => row.receipt_id,
      left: true,
      sortable: true,
      width: "20%",
      cell: (row) => <p>{row.receipt_id}</p>,
      style: {
        fontWeight: "bold",
      },
    },
    {
      name: "RazorPay Order ID",
      selector: (row) => row.razorpay_order_id,
      left: true,
      sortable: true,
      width: "18%",
      cell: (row) => <p>{row.razorpay_order_id}</p>,
    },
    {
      name: "Payment ID",
      selector: (row) => row.razorpay_payment_id,
      left: true,
      sortable: true,
      width: "17%",
      cell: (row) => <p>{row.razorpay_payment_id}</p>,
      style: {
        fontWeight: "bold",
      },
    },
    {
      name: "Date",
      selector: (row) => row.date,
      left: true,
      sortable: true,
      width: "9%",
      cell: (row) => (
        <p>
          {new Date(row.date).toLocaleDateString("en-IN", {
            timeZone: "Asia/Kolkata",
          })}
        </p>
      ),
    },
    {
      name: "Total",
      selector: (row) => row.receipt_total,
      left: true,
      sortable: true,
      width: "10%",
      cell: (row) => <p>&#8377;{row.receipt_total}</p>,
      style: {
        fontWeight: "bold",
      },
    },
    {
      name: "Orders",
      left: true,
      sortable: true,
      width: "26%",
      cell: (row) => (
        <div>
          <ul>
            {row.orders.map((order) => (
              <div>
                <li
                  className="list-item my-2"
                  role="button"
                  key={order.id}
                  onClick={() => onOrderClick(order?.id)}
                >
                  {order?.id}{" "}
                </li>
              </div>
            ))}
          </ul>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout title="All Receipts">
      <div className="shop-page-content">
        <Container className={"grid four-column"}>
          <Row className="align-items-center mt-5">
            <Col md={5} className="text-center text-md-left">
              Total Receipts : {receipts.length}
            </Col>

            <Col md={7}>
              <div className="shop-header__filter-icons justify-content-center justify-content-md-end">
                <div className="search-widget mr-5">
                  <form>
                    <input
                      type="search"
                      placeholder="Search receipts ..."
                      onChange={(e) => setSearchText(e.target.value)}
                    />
                    <button type="button">
                      <IoIosSearch />
                    </button>
                  </form>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <Container className="mt-5">
          <DataTable
            columns={columns}
            data={currentReceipts}
            customStyles={customStyles}
            highlightOnHover
            pagination
          />
        </Container>
      </div>
    </AdminLayout>
  );
};

export default Receipts;
