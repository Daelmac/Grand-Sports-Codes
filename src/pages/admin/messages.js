import { AdminLayout } from "../../components/Layout";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { MdDelete } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { Container, Row, Col } from "react-bootstrap";
import { get_all_messages } from "../../api/messagesApi";
import DataTable from "react-data-table-component";
import customStyles from "../../assets/scss/style/tableStyle";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [currentMessages, setcurrentMessages] = useState([]);
  const [searchText, setSearchText] = useState("");

  //get all messages
  useEffect(async () => {
    let all_messages = await get_all_messages();
    if (all_messages) setMessages(all_messages);
  }, []);

  //manage search with name or email
  useEffect(() => {
    if (searchText != "") {
      const filterCurrentData = currentMessages.filter(
        (item) =>
          item.name &&
          (item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item?.email.toLowerCase().includes(searchText.toLowerCase()))
      );
      setcurrentMessages(filterCurrentData);
    } else {
      setcurrentMessages(messages);
    }
  }, [messages, searchText]);

  // table columns
  const columns = [
    {
      name: "Date",
      selector: (row) => row.date,
      left: true,
      sortable: true,
      width: "10%",
      cell: (row) => (
        <p>
          {new Date(row.date).toLocaleDateString("en-IN", {
            timeZone: "Asia/Kolkata",
          })}
        </p>
      ),
    },
    {
      name: "Name",
      selector: (row) => row.name,
      left: true,
      sortable: true,
      width: "15%",
      cell: (row) => <p>{row.name}</p>,
      style: {
        fontWeight: "bold",
      },
    },
    {
      name: "Email",
      selector: (row) => row.email,
      left: true,
      sortable: true,
      width: "20%",
      cell: (row) => <p>{row.email}</p>,
    },
    {
      name: "Subject",
      selector: (row) => row.subject,
      left: true,
      sortable: true,
      width: "15%",
      cell: (row) => <p>{row.subject}</p>,
    },
    {
      name: "Message",
      selector: (row) => row.message,
      left: true,
      sortable: true,
      width: "40%",
      cell: (row) => <p>{row.message}</p>,
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
    <AdminLayout title="All messages">
      <div className="shop-page-content">
        <Container className={"grid four-column"}>
          <Row className="align-items-center mt-5">
            <Col md={5} className="text-center text-md-left">
              Total Messages : {messages.length}
            </Col>

            <Col md={7}>
              <div className="shop-header__filter-icons justify-content-center justify-content-md-end">
                <div className="search-widget mr-5">
                  <form>
                    <input
                      type="search"
                      placeholder="Search messages ..."
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
            data={currentMessages}
            customStyles={customStyles}
            highlightOnHover
            pagination
          />
        </Container>
      </div>
    </AdminLayout>
  );
};

export default Messages;
