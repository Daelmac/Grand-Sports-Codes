import { AdminLayout } from "../../components/Layout";
import { Fragment, useState, useEffect} from "react";
import { connect } from "react-redux";
import Link from "next/link";
import { MdViewComfy, MdApps, MdList, MdEdit, MdDelete } from "react-icons/md";
import { IoMdFunnel } from "react-icons/io";
import { Container, Row, Col } from "react-bootstrap";
import { getAdmins } from "../../api/userApi";
import DataTable from "react-data-table-component";
import { useDispatch } from 'react-redux'


const AdminList = ({userDetails}) => {
  const [admins, setAdmins] = useState([]);
  const [currentAdmims, setcurrentAdmins] = useState([]);
  const [seatchText, setSeatchText] = useState("");
  const dispatch = useDispatch()

  useEffect(async () => {
    let all_admins = await dispatch(getAdmins(userDetails))
    if(all_admins) setAdmins(all_admins)
  },[]);
  useEffect(() => {
    if (seatchText != "") {
      const filterCurrentData = currentAdmims.filter(
        (item) =>
          item.admin_name &&
          item.admin_name.toLowerCase().includes(seatchText.toLowerCase())
      );
      setcurrentAdmins(filterCurrentData);
    } else {
      setcurrentAdmins(admins);
    }
  }, [
    admins,
    seatchText,
  ]);
  const onDeleteProduct = (product) => {
    console.log("IN Delete==>", product);
  };
  const columns = [
    {
      name: "Id",
      selector: (row) => row.admin_id,
      left: true,
      sortable: true,
      width: "30%",
      cell: (row) => <p>{row.admin_id}</p>,
    },
    {
      name: "Name",
      selector: (row) => row.admin_name,
      left: true,
      sortable: true,
      width: "30%",
      cell: (row) => <p>{row.admin_name}</p>,
      style: {
        fontWeight: "bold",
      },
    },
    {
      name: "Email",
      selector: (row) => row.admin_email,
      left: true,
      sortable: true,
      width: "30%",
      cell: (row) => <p>{row.admin_email}</p>,
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
  return (
    <AdminLayout title="All Admins">
      <div className="shop-page-content">
        <Container className={"grid four-column"}>
          <Row className="align-items-center mt-5">
            <Col md={5} className="text-center text-md-left">
              Total Customers : {admins.length}
            </Col>

            <Col md={7}>
              <div className="shop-header__filter-icons justify-content-center justify-content-md-end">
                <input
                  type="text"
                  placeholder="Search.."
                  className="search mr-5 border border-dark rounded"
                  onChange={(e) => setSeatchText(e.target.value)}
                />
              </div>
            </Col>
          </Row>
        </Container>
        <Container className="mt-5">
          <DataTable columns={columns} data={currentAdmims} pagination />
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
export default connect(mapStateToProps, null)(AdminList);
