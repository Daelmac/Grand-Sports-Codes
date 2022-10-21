import { AdminLayout } from "../../components/Layout";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { MdDelete } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { Container, Row, Col } from "react-bootstrap";
import { getAdmins } from "../../api/userApi";
import DataTable from "react-data-table-component";
import customStyles from "../../assets/scss/style/tableStyle";

const AdminList = () => {
  const [admins, setAdmins] = useState([]);
  const [currentAdmims, setcurrentAdmins] = useState([]);
  const [searchText, setSearchText] = useState("");

  //get add admins data
  useEffect(async () => {
    let all_admins = await getAdmins();
    if (all_admins) setAdmins(all_admins);
  }, []);

  //manage search
  useEffect(() => {
    if (searchText != "") {
      const filterCurrentData = currentAdmims.filter(
        (item) =>
          item.admin_name &&
          item.admin_name.toLowerCase().includes(searchText.toLowerCase())
      );
      setcurrentAdmins(filterCurrentData);
    } else {
      setcurrentAdmins(admins);
    }
  }, [admins, searchText]);

  //table columns
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
    // {
    //   name: "Action",
    //   left: true,
    //   cell: (row) => (
    //     <>
    //       <MdDelete
    //         color="red"
    //         fontSize="1.5em"
    //         role="button"
    //         onClick={(row) => onDeleteProduct(row)}
    //       />
    //     </>
    //   ),
    //   width: "10%",
    //   style: {
    //     fontWeight: "bold",
    //   },
    // },
  ];
  return (
    <AdminLayout title="All Admins">
      <div className="shop-page-content">
        <Container className={"grid four-column"}>
          <Row className="align-items-center mt-5">
            <Col md={5} className="text-center text-md-left">
              Total Admins : {admins.length}
            </Col>

            <Col md={7}>
              <div className="shop-header__filter-icons justify-content-center justify-content-md-end">
                <div className="search-widget mr-5">
                  <form>
                    <input
                      type="search"
                      placeholder="Search admins ..."
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
            data={currentAdmims}
            customStyles={customStyles}
            highlightOnHover
            pagination
          />
        </Container>
      </div>
    </AdminLayout>
  );
};

export default AdminList;
