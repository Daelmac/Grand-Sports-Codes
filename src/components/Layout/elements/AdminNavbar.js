import Navbar from "react-bootstrap/Navbar";
import { Container } from "react-bootstrap";
import { IoMdPerson } from "react-icons/io";
import { connect } from "react-redux";

const AdminNavbar = ({ title,adminDetails }) => {
 
  return (
    <Navbar style={{backgroundColor:"#f1f1f1"}}>
              <Container>
                <Navbar.Brand href="#">{title}</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                  <Navbar.Text>
                  <IoMdPerson />{adminDetails?.email}
                  </Navbar.Text>
                </Navbar.Collapse>
              </Container>
            </Navbar>
  );
};
const mapStateToProps = (state) => {
  return {
    adminDetails: state.currentUserData,
  };
};


export default connect(mapStateToProps)(AdminNavbar);