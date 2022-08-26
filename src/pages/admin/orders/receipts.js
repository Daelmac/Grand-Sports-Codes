import { AdminLayout } from "../../../components/Layout";
import { Fragment, useState, useEffect} from "react";
import { connect } from "react-redux";
import Link from "next/link";
import { MdViewComfy, MdApps, MdList, MdEdit, MdDelete,MdOutlineRemoveR } from "react-icons/md";
import { IoMdFunnel,IoEye, IoIosSearch } from "react-icons/io";
import { Container, Row, Col } from "react-bootstrap";
import { get_all_receipts } from "../../../api/orderApi";
import DataTable from "react-data-table-component";
import { useDispatch } from 'react-redux'
import Router from "next/router";


const Receipts = ({userDetails}) => {
  const [receipts, setReceipts] = useState([]);
  const [currentReceipts, setCurrentReceipts] = useState([])
  const [searchText, setSearchText] = useState("");
  // const [filter,setFilter] = useState(null)
  const dispatch = useDispatch()

  useEffect(async () => {
    let all_receipts = await dispatch(get_all_receipts(userDetails))
    if(all_receipts) setReceipts(all_receipts)
  },[]);

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
  }, [
    receipts,
    searchText,
  ]);

  const onOrderClick = (id) => {
    Router.push(`/admin/orders/${id}`)
  };;
  const columns = [
    {
      name: "Receipt ID",
      selector: (row) => row.receipt_id,
      left: true,
      sortable: true,
      width: "30%",
      cell: (row) => <p>{row.receipt_id}</p>,
      style: {
        fontWeight: "bold",
      },
    },
    {
      name: "Date",
      selector: (row) => row.date,
      left: true,
      sortable: true,
      width: "20%",
      cell: (row) => <p>{new Date(row.date).toLocaleDateString("en-IN", {timeZone: 'Asia/Kolkata'})}</p>,
    },
    {
      name: "Receipt Total",
      selector: (row) => row.receipt_total,
      left: true,
      sortable: true,
      width: "20%",
      cell: (row) => <p>&#8377;{row.receipt_total}</p>,
      style: {
        fontWeight: "bold",
      },
    },
    {
      name: "Orders",
      left: true,
      sortable: true,
      width: "30%",
      cell: (row) => (
       <div>
        <ul >
        {
          row.orders.map(order=>(
           <div>
            <li className="list-item my-2" role="button" key={order.id} onClick={()=>onOrderClick(order?.id)}>{order?.id} </li> 
          </div> 
          ))
        } 
        </ul>
       </div>
      )
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
                    <input type="search" placeholder="Search receipts ..."  onChange={(e) => setSearchText(e.target.value)}/>
                    <button type="button">
                      <IoIosSearch />
                    </button>
                  </form>
                </div>
                {/* <div className="single-icon filter-dropdown">
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
                </div> */}
              </div>
            </Col>
          </Row>
        </Container>
        <Container className="mt-5">
          <DataTable columns={columns} data={currentReceipts} pagination />
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
export default connect(mapStateToProps, null)(Receipts);
