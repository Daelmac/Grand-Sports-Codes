import { AdminLayout } from "../../../components/Layout";
import { Fragment, useState, useEffect} from "react";
import { connect } from "react-redux";
import Link from "next/link";
import { MdViewComfy, MdApps, MdList, MdEdit, MdDelete,MdOutlineRemoveR } from "react-icons/md";
import { IoMdFunnel,IoEye } from "react-icons/io";
import { Container, Row, Col } from "react-bootstrap";
import { get_all_purchases } from "../../../api/orderApi";
import DataTable from "react-data-table-component";
import { useDispatch } from 'react-redux'
import Router from "next/router";


const AllOrders = ({userDetails}) => {
  const [orders, setOrders] = useState([]);
  const [currentOrders, setCurrentOrders] = useState([]);
  const [seatchText, setSeatchText] = useState("");
  const [filter,setFilter] = useState(null)
  const dispatch = useDispatch()

  useEffect(async () => {
    let all_purchases = await dispatch(get_all_purchases(userDetails,filter))
    if(all_purchases) setOrders(all_purchases)
  },[filter]);
  useEffect(() => {
    if (seatchText != "") {
      const filterCurrentData = currentOrders.filter(
        (item) =>
          item.order_id &&
          (item.order_id.toLowerCase().includes(seatchText.toLowerCase()) || item.customer_id.toLowerCase().includes(seatchText.toLowerCase()))
      );
      setCurrentOrders(filterCurrentData);
    } else {
      setCurrentOrders(orders);
    }
  }, [
    orders,
    seatchText,
  ]);
  const onEditOrder = (e,order) => {
    console.log(order)
    Router.push(`/admin/orders/${order.order_id}`)
  };;
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
      cell: (row) => <p>{new Date(row.order_date).toLocaleDateString("en-IN", {timeZone: 'Asia/Kolkata'})}</p>,
    },
    {
      name: "Receipt ID",
      selector: (row) => row.receipt_id,
      left: true,
      sortable: true,
      width: "15%",
      cell: (row) => <p>{row.receipt_id}</p>,
    },
    {
      name: "Customer ID",
      selector: (row) => row.customer_id,
      left: true,
      sortable: true,
      width: "15%",
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
      width: "10%",
      cell: (row) => (
        <div>
          {row.order_status== "Pending"?<p className="pending-text">{row.order_status}</p>:null}
          {row.order_status== "Confirmed"?<p className="confirm-text">{row.order_status}</p>:null}
          {row.order_status== "Shipped"?<p className="shipped-text">{row.order_status}</p>:null}
          {row.order_status== "Delivered"?<p className="delivered-text">{row.order_status}</p>:null}
          {row.order_status== "Cancelled"?<p className="cancelled-text">{row.order_status}</p>:null}
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
            onClick={(e) => onEditOrder(e,row)}
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
                    <option value={null}>All</option>
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <Container className="mt-5">
          <DataTable columns={columns} data={currentOrders} pagination />
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
export default connect(mapStateToProps, null)(AllOrders);
